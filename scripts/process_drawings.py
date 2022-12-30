import pandas as pd


def to_int(value):
    try:
        return int(value)
    except ValueError:
        return 0


def rename_no_time(value):
    no_time_string = 'NaT'
    if str(value) == no_time_string:
        return '1980-01-01'
    return value


def main():
    pole_file = 'Transmission_Drawings.txt'
    df = pd.read_table(pole_file, sep=',', header=None, names=['ID', 'NAME', 'LINE', 'DWG_TITLE', 'REV_NO', 'DWG_DATE'])
    df['DWG_DATE'] = pd.to_datetime(df['DWG_DATE'])
    df['DWG_DATE'] = df['DWG_DATE'].fillna('')
    df['NAME'] = df['NAME'].str.strip()
    df['DWG_TITLE'] = df['DWG_TITLE'].str.strip()
    df['DWG_TITLE'] = df['DWG_TITLE'].str.replace('"', '')
    df['REV_NO'] = df['REV_NO'].apply(to_int)

    # Create lists
    drawing_id = df['ID'].tolist()
    drawing_name = df['NAME'].tolist()
    drawing_title = df['DWG_TITLE'].tolist()
    revision_number = df['REV_NO'].tolist()
    revision_date = df['DWG_DATE'].tolist()
    line_id = df['LINE'].tolist()

    n = df.shape[0]

    with open('drawing_data_import.sql', 'w') as f:
        # write SQL text
        sql_cmd_text = f'INSERT INTO drawings(drawing_id, drawing_name,' \
                       f' drawing_title, revision_number, revision_date,' \
                       f' line_id) VALUES\n'
        f.write(sql_cmd_text)

        # write data
        for i in range(n):
            base_text = f'({drawing_id[i]}, "{drawing_name[i]}", "{drawing_title[i]}",' \
                        f'{revision_number[i]},' \
                        f' "{rename_no_time(revision_date[i])}", {line_id[i]})'

            if i == n - 1:
                text = f'{base_text};'
            else:
                text = f'{base_text},\n'
            f.write(text)


if __name__ == '__main__':
    main()
