FROM node:14.4.0-stretch

MAINTAINER <chenyiyanggermany@gmail.com>

WORKDIR /usr/local/bin/

COPY webpostboard .

#RUN ls

#EXPOSE 4000 
EXPOSE 5000

#CMD ["/bin/bash"]
#CMD ["node", "authServer.js"]
CMD ["node", "restServer.js"]

#Volume: /SqliteVolumeShare