# Appointment-Booking-System

<h2>HOW TO RUN THIS PROJECT</h2>
  <p>Download the repository. You should have React, npm, and MySQL installed on your PC.</p>

  <h3>How to Open the Project in IDE (Spring Boot and React)</h3>
  <p>Download the zip file and extract it.<br> 
  Go to the extracted file and open the frontend project in your IDE. Then, do the same for the backend. Start the backend in your IDE, and proceed to start both the frontend and backend by following the steps below.</p>
  
  <h3>Install Dependencies (React)</h3>
  <p><code>npm install</code></p>
  
  <h3>Run Project (React)</h3>
  <p><code>npm start</code></p>
  
  <h3>Setup Spring Boot Database and Mail Server</h3>
  <p>The database connection can be configured in the <code>application.properties</code> file with the following properties:</p>
  <pre>
spring.jpa.hibernate.ddl-auto=update
spring.datasource.url=jdbc:mysql://localhost:3306/appointment_booking?createDatabaseIfNotExist=true
spring.datasource.username=Your username
spring.datasource.password=Your password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.show-sql=true
  </pre>
  
  <p>The mail server connection can be configured in the <code>application.properties</code> file with the following properties:</p>
  <pre>
spring.mail.host=smtp-relay.brevo.com
spring.mail.port=587
spring.mail.username=your username
spring.mail.password=your password
spring.mail.properties.mail.smpt.auth=true
spring.mail.properties.mail.startts.enable=true
spring.mail.properties.mail.starttls.required=true
  </pre>
  
  <p>In the <code>SignUpMail</code> class, update the <code>setFrom</code> method as:</p>
  <pre>
signMessage.setFrom("your brevo email");
  </pre>

  <h2>Description of Features and Tools Used</h2>
  <p>This application is an appointment booking system built with a focus on real-time validations, time slot management, and email notifications. It provides features for both users and admins.</p>

  <h2>Technologies Used</h2>
  <ul>
    <li><strong>Frontend:</strong> React.js</li>
    <li><strong>Backend:</strong> Spring Boot</li>
  </ul>

  <h2>Features</h2>
  
  <h3>User Features:</h3>
  <ul>
    <li><strong>Authentication & Validation:</strong>
      <ul>
        <li>Email and field validation for login and signup.</li>
        <li>Password validation for change password</li>
        <li>Upon successful registration, a confirmation email is sent to the user's email.</li>
      </ul>
    </li>
    <li><strong>Appointment Booking System:</strong>
      <ul>
        <li>Users can create an account.</li>
        <li>Users can book appointments.</li>
        <li>Validation is applied when booking an appointment.</li>
        <li>Users can view their booked appointments.</li>
        <li>Users can delete their appointments.</li>
        <li>Users can see available time slots for a selected date.</li>
        <li>A user cannot book multiple appointments in the same time slot.</li>
        <li>When an appointment is booked, the user receives an email with appointment details.</li>
        <li>User can change their password</li>
      </ul>
    </li>
    <li><strong>User Profile:</strong>
      <ul>
        <li>The user account displays a profile icon, showing the first letter of the user’s name.</li>
        <li>The registered email is visible in the user profile.</li>
      </ul>
    </li>
  </ul>
  
  <h3>Admin Features:</h3>
  <ul>
    <li><strong>Appointment Management:</strong> The admin can view all booked appointments.</li>
    <li><strong>Time Slot Management:</strong>
      <ul>
        <li>The admin can view available slots.</li>
        <li>The admin can set available time periods, which are automatically divided into 15-minute slots.</li>
      </ul>
    </li>
  </ul>
  
  <h2>Conclusion</h2>
  <p>This system ensures a smooth appointment booking process with automated time slot management, real-time validations, and email notifications for users.</p>
