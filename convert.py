"""Convert Obsidian files to a Jekyll-readable format"""

### Imports
import os
import shutil
from glob import glob
from tqdm import tqdm
from datetime import datetime

### Constants

src_dir="/Users/puriaradmard/Library/Mobile Documents/iCloud~md~obsidian/Documents/BACKUP PhD Knowledge"
out_dir="_notes/Public"
home_page_file="Homepage.md"
header_template = """
---
title: {title}
feed: {feed}
date: {date}
format: list
---
"""[1:] # remove \n at start!

### Functions


def get_string_from_path(ip):
    with open(ip, 'r') as f:
        string = f.read()
    return string

def prepend_file_string(body, header, sep='\n\n'):
    return header + sep + body

def write_to_file(string, output_path):
    with open(output_path, 'w') as f:
        f.write(string)

def convert_file(file_list, header_string):
    input_path = build_path(file_list, base=src_dir)
    output_path = build_path(file_list, base=out_dir)
    starting_string = get_string_from_path(input_path)
    resulting_string = prepend_file_string(starting_string, header_string)
    write_to_file(resulting_string, output_path)

def remove_prefix(text, prefix):
    if text.startswith(prefix):
        return text[len(prefix):]
    return text  # or whatever

def get_all_src_files():
    all_files_raw = glob(os.path.join(src_dir, "**"), recursive = True)
    all_files_as_lists = list(map(lambda x: remove_prefix(x, prefix=src_dir + '/').split('/'), all_files_raw))
    return all_files_as_lists

def build_path(sub, base=None):
    if base is None:
        return os.path.join(*sub)
    return os.path.join(base, *sub)

def construct_directory_structure(list_files):
    lens = [len(lf) for lf in list_files]
    for depth in range(2, 1 + max(lens)):
        all_at_this_depth = set([tuple(lf[:depth-1]) for lf in list_files if len(lf) == depth])
        for dir_tup in all_at_this_depth:
            dir_path = build_path(dir_tup, base = out_dir)
            try:
                os.mkdir(dir_path)
            except FileExistsError:
                print(dir_path, 'already exists')


def generate_header(file_name_as_list, show):
    original_file_name = build_path(file_name_as_list, base = src_dir)
    assert file_name_as_list[-1][-3:] == '.md'
    header = header_template.format(
        title = file_name_as_list[-1][:-3],
        date = datetime.fromtimestamp(os.stat(original_file_name).st_birthtime).strftime('%d-%m-%Y'),
        #permalink = "/" + build_path(file_name_as_list).replace(' ', '%20')
        feed = 'show' if show else 'hide'
    )
    return header

def copy_over_files(all_files_as_lists, links_on_homepage):
    for file_list in tqdm(all_files_as_lists):
        original_file_name = build_path(file_list, base = src_dir)
        if os.path.isfile(original_file_name):
            if file_list[-1].endswith(".md"):
                is_on_homepage = file_list[-1][:-3] in links_on_homepage
                header_string = generate_header(file_list, show = is_on_homepage)
                convert_file(file_list=file_list, header_string=header_string)
            else:
                shutil.copy(
                    build_path(file_list, src_dir),
                    build_path(file_list, out_dir)
                )


def get_front_page_titles():
    homepage_path = build_path([home_page_file], base=src_dir)
    homepage_string = get_string_from_path(homepage_path)
    return [link.split(']]')[0] for link in homepage_string.split('[[')]


if __name__ == '__main__':
    all_src_files = get_all_src_files()
    construct_directory_structure(all_src_files)
    front_page_titles = get_front_page_titles()
    copy_over_files(all_src_files, front_page_titles)

