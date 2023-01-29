# Existing Conditions
## Overview
Transmission lines carry electricity over long distances at high voltages, and are an essential part of the power grid. A line is designated by both an abbreviation and line number. Transmission poles have a pole ID or PLI and a stencil number which contains both the line abbreviation and approximate milepost in miles, e.g. XX- 0/1. The existing or as-built condition of a transmission pole is tracked using transmission drawings. A single drawing contains one or more poles, framing details, setting depth, and other information. The transmission drawings are organized by folder, with a different folder for each line. 

The existing process of finding the drawings is either done manually by searching through the line folders, or using the Microsoft Access tool. The Microsoft Access tool has several shortcomings
- Requires installation of Microsoft Access, an additional step for all users
- Slow interface that is limited by Access form features
- Limited extensibility, cannot easily add additional features
- Lack modern and fast user interface
- Disliked by users because it's slow and non-intuitive to use

The new tool should, at a minimum, meet the following requirements
- Run without installation of client side software
- Use open-source or free software
- Provide fast and intuitive interface
- Administrative interface for adding, updating, and removing information 

![workflow_img](./assets/images/workflow.png 'workflow')

## Existing Interface and Reports
The UI flow branches to two main paths, one for viewing data from the tables, and the other for making queries to the database. Both offer return paths to the main menu.
![ui_flow](./assets/images/ui_flow.png 'ui_flow')

The landing page the splits the two workflows - viewing and querying data. 
![landing_page_img](./assets/images/existing_conditions_1.png 'landing_page_img')

The first path entitled "Enter Transmission Drawings" provides a means of viewing the database tables. 
![trx_dwg_img](./assets/images/existing_conditions_2.png 'trx_dwg_img')

The second path provides users with the ability to make queries, and in this example shows all drawings associated with a particular transmission line.
![trx_dwg_by_line](./assets/images/existing_conditions_3.png 'trx_dwg_by_line')

The "Transmission Poles by Line Number" shows all poles that are associated with a particular line. 
![trx_pole_by_line](./assets/images/existing_conditions_4.png 'trx_pole_by_line')

The "Transmission Drawings by Pole Stencil" report shows all drawings associated with a particular pole stencil. 
![trx_dwg_by_stencil](./assets/images/existing_conditions_5.png 'trx_dwg_by_stencil')

The last report "Transmission Poles by Drawing Number," is a kind of reverse search and not used frequently, because engineers are typically searching for the drawing name, and not the reverse situation where they have a drawing and are looking for pole information on that drawing. 