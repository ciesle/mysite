SOURCE_DIRS:=links profile tech top univ zakki download
RESOURCE_DIRS:=nginx

include local.env


.PHONY: send_src
send_src: $(FILES)
	$(foreach name,$(SOURCE_DIRS), \
		scp -r ./$(name)/* $(SERVER_NAME):/var/www/html/$(name)/;\
	)

.PHONY: send_res
send_res: $(FILES)
	$(foreach name,$(RESOURCE_DIRS), \
		scp -r ./$(name)/* $(SERVER_NAME):/etc/nginx;\
	)

.PHONY: send
send: send_res send_src