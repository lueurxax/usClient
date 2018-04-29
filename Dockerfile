FROM git.credebat.com:4567/td/tradingdesk/blank

RUN rm /etc/nginx/conf.d/default.conf
ADD nginx.conf /etc/nginx/conf.d/traderServer.conf
ADD config.yml /root/.prisma/config.yml

RUN mkdir -p /home/app/traderServer

WORKDIR /home/app/traderServer/

COPY ./ /home/app/traderServer/
RUN rm /home/app/traderServer/.env*
RUN node -v
RUN cd /home/app/traderServer/ && yarn && yarn cache clean

CMD ["sh", "./start.sh"]

EXPOSE 80
