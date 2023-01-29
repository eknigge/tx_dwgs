import pandas as pd
import datetime
import sys

# default date for unknown dates
default_date = datetime.datetime(1990, 1, 1)

def convert_to_bool(values: list) -> list:
    translation_table = {'Y': 1, 'N': 0}

    for i in range(len(values)):
        values[i] = translation_table[values[i]]
    return values

def correct_date_boundary(values: pd.Series) -> pd.Series:
    max_date = datetime.datetime(2030, 1, 1)
    values = values.tolist()

    for i in range(len(values)):
        try:
            if values[i] > max_date:
                values[i] = default_date
        except TypeError:
            values[i] = default_date

    
    return pd.to_datetime(values)


def main():
    filename = sys.argv[1]
    df = pd.read_excel(filename)

    # default date field 

    # export relevant fields to lists
    pole_stencil = df['TRANS_STENCIL'].fillna('NA').tolist()
    pole_location_id = df['POLE_LOCATION_ID'].tolist()
    line_number = df['ACCTG_TRANS_LN_NO'].tolist()
    height = df['HEIGHT'].fillna(0).tolist()
    pole_class = df['CLASS'].tolist()
    type_description = df['CONSTR_TYPE_DESC'].str.replace('"', '').tolist()
    construction_assembly = df['CONSTR_ASSY'].tolist()
    phase_configuration = df['PHASE_CONFIG'].fillna(0).tolist()
    manufacturer_date = correct_date_boundary(df['MANUFACTURER_DATE']).tolist()
    pole_material = df['POLE_MATERIAL'].tolist()
    install_date = correct_date_boundary(df['INSTALL_DATE'].fillna(default_date)).to_period('D').tolist()
    pud_owned = df['PUD_OWNED'].tolist()
    joint_presence = df['JOINT_PRESENCE_IND'].tolist()
    catv_presence = df['CATV_PRESENCE_IND'].tolist()
    fiber_presence = df['FIBER_PRESENCE_IND'].tolist()
    tel_presence = df['TEL_PRESENCE_IND'].tolist()
    cell_presence = df['CELL_PRESENCE_IND'].tolist()
    latitude = df['LATITUDE'].tolist()
    longitude = df['LONGITUDE'].tolist()

    # convert bool values 
    pud_owned = convert_to_bool(pud_owned)
    joint_presence = convert_to_bool(joint_presence)
    catv_presence = convert_to_bool(catv_presence)
    fiber_presence = convert_to_bool(fiber_presence)
    tel_presence = convert_to_bool(tel_presence)
    cell_presence = convert_to_bool(cell_presence)

    with open('pole_details_data_import.sql', 'w') as f:
        # SQL fields import text
        sql_cmd_text = (f'INSERT INTO pole_details \n\t('
        f'pole_detail_id, '
        f'pole_stencil, pole_location_id, line_number, height, pole_class,'
        f'type_description, construction_assembly\n\t, phase_configuration, '
        f'manufacturer_date, pole_material, install_date, pud_owned, joint_presence,'
        f'catv_presence, \n\tfiber_presence, tel_presence, cell_presence,'
        f'latitude, longitude)'
        f'\nVALUES\n')
        f.write(sql_cmd_text)

        # import list data
        n = len(pole_location_id)


        for i in range(n):
            # text to add values to database 
            value_import_text = (f'{i}, "{pole_stencil[i]}", "{pole_location_id[i]}", '
            f'{line_number[i]}, {height[i]}, "{pole_class[i]}", "{type_description[i]}",'
            f'"{construction_assembly[i]}", "{phase_configuration[i]}", "{manufacturer_date[i]}",'
            f'"{pole_material[i]}", "{install_date[i]}", {pud_owned[i]},'
            f'{joint_presence[i]}, {catv_presence[i]}, {fiber_presence[i]},'
            f'{tel_presence[i]}, {cell_presence[i]}, {latitude[i]},{longitude[i]}'
            )

            if i == n - 1:
                text = f'\t({value_import_text});'
            else:
                text = f'\t({value_import_text}),\n'

            # write text to output file
            f.write(text)

            # print progress to terminal
            print(f'{i}/{n}')

            # if i == 50:
            #     break
        


if __name__ == '__main__':
    main()