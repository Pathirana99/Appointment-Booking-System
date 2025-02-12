# Appointment-Booking-System

<h2>HOW TO RUN THIS PROJECT</h2>
Download repository you should installed react, npm, Mysql in your PC
<h3>How to open project in IDE(Spring Boot and React) </h3>
Download zip file, extract that file,

Go to the extracted file. Open the frontend project in your IDE. Then, do the same for the backend. Start the backend in your IDE. proceed to start the frontend and backend by following the steps below.
<h3>Install dependancy(React)</h3>
npm install
<h3>Run project(React)</h3>
npm start
<h3>Setup Spring Boot Database and Mail Server</h3>

The database connection can be configured in the application.properties file, with the appropriate values for the following properties:

spring.jpa.hibernate.ddl-auto=update
spring.datasource.url=jdbc:mysql://localhost:3306/appointment_booking?createDatabaseIfNotExist=true
spring.datasource.username=Your username
spring.datasource.password=Your password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.show-sql=true

The mail server connection can be configured in the application.properties file, with the appropriate values for the following properties and want to cange SignUpMail class:

spring.mail.host=smtp-relay.brevo.com
spring.mail.port=587
spring.mail.username=your username
spring.mail.password=your password
spring.mail.properties.mail.smpt.auth=true
spring.mail.properties.mail.startts.enable=true
spring.mail.properties.mail.starttls.required=true

signMessage.setFrom("your bravo email");

<h2>Description</h2>
