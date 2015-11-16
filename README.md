# starter

# tomcat remote debug
JPDA_OPTS="-agentlib:jdwp=transport=dt_socket,address=8000,server=y,suspend=n"
catalina.bat jpda start

