# SL2 Database Documentation

## MongoDB 
For our SL2 product, we are utilizing MongoDB to store our parsed log data, student/professor information, and classes/courses information.
Our database is hosted on Mongo Atlas, a cloud-based database hosting service that has free options for storing information. 
The SL2 cluster is currently owned by Nathan Radin, Database Admin, but ownership can be moved to another admin when handoff occurs.


### Mongo Collection/Structure
The SL2 database contains three separate collections for data storing:
- Classes
- Professors
- Students

The below sections will provide information on how are collections are set up. We have used the following formatting for consistency:

Ex. - Readable Name (*Api Name*) - *Data structure* **brief explantation.**

#### Classes
The classes collection will contain information directly associated with the classes being covered for the product.
As of our Beta version on 10/18/2022, each class has the following datapoints:

- Class Name (*class_name*): *String* **English title of class.**
- Class Code (*class_code*): *String* **Class code associated with title.**

#### Professors
The professors collection will contain information about each professor as an individual. 
As of our Beta version on 10/18/2022, each professor has the following datapoints:

- First Name (*first_name*): *String* **First name of the professor.**
- Last Name (*last_name*): *String* **Last name of the professor.**
- Courses (*courses*): *Array* **List of courses professor is teaching.**
- Email (*email*): *String* **Email associated with professor.**
- Password (*password*): *String* **Password professor uses to log into SL2.**
- Pinned Students (*pinned*): *Array* **List of pinned students, used for quick reference on SL2 home page.**

#### Students
The students collection will contain all information about students, as well as their respective parsed logs.
As of our Beta version on 10/18/2022, each student has the following datapoints:

- University ID (*uid*): *Integar* **Id given to student who attends RIT.**
- Username (*username*): *String* **Username of student, given by RIT. Ex. abc1234.**
- First Name (*first_name*): *String* **First name of student.**
- Last Name (*last_name*): *String* **Last name of student.**
- Courses (*courses*): *Array* **List of courses student is taking.**
- Email (*email*): *String* **RIT email of student.**
- IP Address (*ip*): *String* **IP Address of the student.**
- Parsed Login Logs (*logs*): *Array* **List of Log objects pertaining to each login attempt by user.**
    - Datetime (*datetime*): *Datetime* **Date and time of that particular login attempt.**
    - Result (*result*): *Strin*g **Result of the connected log file, either Success, Disconnect, or Failure.**
