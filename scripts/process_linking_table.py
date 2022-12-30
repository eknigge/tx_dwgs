import pandas as pd


def main():
    linking_table_file = 'Pole_to_Dwg_Junction.txt'
    df = pd.read_table(linking_table_file, sep=',',
                       header=None, names=['ID', 'POLE_ID', 'DWG_ID'])

    # Create lists
    pole_drawings_id = df['ID'].tolist()
    pole_id = df['POLE_ID'].tolist()
    drawing_id = df['DWG_ID'].tolist()

    n = df.shape[0]

    with open('linking_table_data_import.sql', 'w') as f:
        # write SQL text
        sql_cmd_text = f'INSERT INTO pole_drawings(pole_drawings_id,' \
                       f' pole_id, drawing_id) VALUES\n'
        f.write(sql_cmd_text)

        # write data
        for i in range(n):
            base_text = f'({pole_drawings_id[i]}, {pole_id[i]}, {drawing_id[i]})'

            if i == n - 1:
                text = f'{base_text};'
            else:
                text = f'{base_text},\n'
            f.write(text)


if __name__ == '__main__':
    main()
