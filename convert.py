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
image_path="assets/img"
home_page_file="Homepage.md"
header_template = """
---
title: {title}
feed: {feed}
date: {date}
format: list
page_order: {page_order}
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

def fix_maths(string):
    string = string.replace('|', '\vert')    # Assume they are all in latex anyway!!
    # First fix double dollars
    if '$$' in string:
        split_by_double = string.split('$$')
        fixed_string = ""
        for i, sbd in enumerate(split_by_double):
            fixed_string += sbd
            if i % 2 == 0:
                #fixed_string += '\n\n$$'
                fixed_string += '\n\n$$'
            else:
                #fixed_string += '$$\n\n'
                fixed_string += '$$\n\n'
        string = fixed_string
    # Then the single ones, in a hacky way
    string = string.replace('$', '$$')
    string = string.replace('$$$$', '$$')
    # if '$' in string:
    #     split_by_single = string.split('$')
    #     fixed_string = ""
    #     for i, sbd in enumerate(split_by_single):
    #         fixed_string += sbd
    #         if i % 2 == 0:
    #             fixed_string += ' \('
    #         else:
    #             fixed_string += '\) '
    #     string = fixed_string
    return string

def fix_images(string:str):
    assert not string.startswith('![[')
    image_start_splits = string.split('![[')
    output_string = image_start_splits[0]
    for iss in image_start_splits[1:]:
        split_next = iss.split(']]')
        img_filename = build_path([split_next[0]], base=image_path)
        output_string += f'![]({img_filename})'
        output_string += '{:class="img-responsive"}'
        output_string += "]]".join(split_next[1:])
    return output_string

def convert_file(file_list, header_string):
    input_path = build_path(file_list, base=src_dir)
    output_path = build_path(file_list, base=out_dir)
    starting_string = get_string_from_path(input_path)
    resulting_string = prepend_file_string(starting_string, header_string)
    resulting_string = fix_maths(resulting_string)
    resulting_string = fix_images(resulting_string)
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
            image_dir_path = build_path(dir_tup, base = image_path)
            try:
                os.mkdir(dir_path)
            except FileExistsError:
                print(dir_path, 'already exists')
            try:
                os.mkdir(image_dir_path)
            except FileExistsError:
                print(image_dir_path, 'already exists')



def generate_header(file_name_as_list, show, index):
    original_file_name = build_path(file_name_as_list, base = src_dir)
    assert file_name_as_list[-1][-3:] == '.md'
    header = header_template.format(
        title = file_name_as_list[-1][:-3],
        date = datetime.fromtimestamp(os.stat(original_file_name).st_birthtime).strftime('%d-%m-%Y'),
        #permalink = "/" + build_path(file_name_as_list).replace(' ', '%20')
        feed = 'show' if show else 'hide',
        page_order = index
    )
    return header

def copy_over_files(all_files_as_lists, links_on_homepage):
    for file_list in tqdm(all_files_as_lists):
        original_file_name = build_path(file_list, base = src_dir)
        if os.path.isfile(original_file_name):
            if file_list[-1].endswith(".md"):
                is_on_homepage = file_list[-1][:-3] in links_on_homepage
                index = 1 + (links_on_homepage.index(file_list[-1][:-3]) if is_on_homepage else len(links_on_homepage))
                header_string = generate_header(file_list, show = is_on_homepage, index = index)
                convert_file(file_list=file_list, header_string=header_string)
            elif file_list[-1].endswith(".jpg") or file_list[-1].endswith(".jpeg") or file_list[-1].endswith(".png"):
                shutil.copy(
                    build_path(file_list, src_dir),
                    build_path(file_list, image_path)
                )
            else:
                raise TypeError(file_list[-1])


def get_front_page_titles():
    homepage_path = build_path([home_page_file], base=src_dir)
    homepage_string = get_string_from_path(homepage_path)
    return [link.split(']]')[0] for link in homepage_string.split('[[')]


if __name__ == '__main__':
    all_src_files = get_all_src_files()
    construct_directory_structure(all_src_files)
    front_page_titles = get_front_page_titles()
    copy_over_files(all_src_files, front_page_titles)

