import pandas as pd


def main():
    line_file = 'Transmission_Lines.txt'
    df = pd.read_table(line_file, sep=',', header=None, names=['ID', 'LINE_NO', 'LINE_NAME', 'LINE_ABB'])
    df['LINE_NAME'] = df['LINE_NAME'].str.strip()
    df['LINE_ABB'] = df['LINE_ABB'].str.strip()
    df['LINE_ABB'] = df['LINE_ABB'].str.upper()

    print(df.head())

    n = df.shape[0]
    line_id = df['ID'].tolist()
    line_number = df['LINE_NO'].tolist()
    line_name = df['LINE_NAME'].tolist()
    line_abbreviation = df['LINE_ABB'].tolist()

    with open('line_data_import.sql', 'w') as f:
        # write SQL text
        sql_cmd_text = f'INSERT INTO line(line_id, line_number,' \
                       f' line_name, line_abbreviation) VALUES\n'
        f.write(sql_cmd_text)

        # write data
        for i in range(n):
            value_text = f'({line_id[i]}, {line_number[i]}' \
                         f', "{line_name[i]}", "{line_abbreviation[i]}")'
            if i == n - 1:
                text = f'{value_text};'
            else:
                text = f'{value_text},\n'
            f.write(text)


if __name__ == '__main__':
    main()
