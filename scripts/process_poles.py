import pandas as pd


def main():
    pole_file = 'Transmission_Poles.txt'
    df = pd.read_table(pole_file, sep=',', header=None, names=['ID', 'STENCIL'])
    df['STENCIL'] = df['STENCIL'].str.strip()

    n = df.shape[0]
    pole_ids = df['ID'].tolist()
    pole_stencils = df['STENCIL'].tolist()

    with open('pole_data_import.sql', 'w') as f:
        # write SQL text
        sql_cmd_text = f'INSERT INTO pole(pole_id, pole_stencil) VALUES\n'
        f.write(sql_cmd_text)

        # write data
        for i in range(n):
            if i == n - 1:
                text = f'({pole_ids[i]}, "{pole_stencils[i]}");'
            else:
                text = f'({pole_ids[i]}, "{pole_stencils[i]}"),\n'
            f.write(text)


if __name__ == '__main__':
    main()
