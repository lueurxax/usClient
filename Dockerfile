FROM lueurxax/blank

RUN rm /etc/nginx/conf.d/default.conf
ADD nginx.conf /etc/nginx/conf.d/usclient.conf

RUN mkdir -p /home/app/usclient

WORKDIR /home/app/usclient/

COPY ./ /home/app/usclient/
RUN node -v
RUN cd /home/app/usclient/ && yarn && yarn cache clean

CMD ["sh", "./start.sh"]

EXPOSE 80
