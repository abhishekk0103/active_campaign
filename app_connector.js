const {
  HttpUtils,
  HttpUtils: { request, successResponse, errorResponse },
  STATUS,
} = require("quickwork-adapter-cli-server/http-library");


const app = {
    name : "activecampaign",
    alias : "activecampaign",
    description : "App Description",
    version : "1",
    config : {"authType":"api_key"},
    webhook_verification_required : false,
    internal : false,
    connection : {
        input_fields : () => [
            {
              key : "apiKey",
              name: "API Key",
              controlType : "password",
              required: true,
              type : "string",
              hintText: "Enter API key",
              helpText : "Enter API key",
              isExtendedSchema : false
            }
        ],
        authorization: {
            type: "api_key",
            credentials: (connection) => ({
                "Api-Token": connection.input["apiKey"],
            }),
        }
    },
    actions : {
    },
    triggers: {
        new_campaign: {
          description: "New Campaign",
          hint: "Triggers when a <b>new event</b> added via <b>Google Calendar</b>",
          type:"poll",

          input_fields: () =>[],
          execute: async (connection, input, nextPoll) => {
            try {

              if(nextPoll === undefined){
                nextPoll = 0;
              }
            
              var url = `https://quickwork32115.activehosted.com/api/3/campaigns`;
              let queryParams={
                "orders[cdate]": "ASC",
                offset : nextPoll,
                limit: 1,
              }
              const headers = app.connection.authorization.credentials(connection);
              const response = await HttpUtils.request(url, headers, queryParams);
              // events = JSON.parse(response.body.campaigns)
              events = response.body.campaigns
              if(events.length > 0){
                // nextPoll = events[0].cdate;
                nextPoll++;
              }
              // console.log({url, headers, response});
              return successResponse({
                events: events,
                nextPoll : nextPoll,
              });
            } catch (error) {
              console.log(error);
              return HttpUtils.errorResponse(error.message);
            }
          },

          dedup : (campaign) =>{
            return campaign.id;
          },

          // output_fields: () => app.objectDefinitions.campaigns
          output_fields: () => [
            {
              "key": "type",
              "name": "Type",
              "hintText": "Type",
              "helpText": "Type",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "userid",
              "name": "Userid",
              "hintText": "Userid",
              "helpText": "Userid",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "segmentid",
              "name": "Segmentid",
              "hintText": "Segmentid",
              "helpText": "Segmentid",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "bounceid",
              "name": "Bounceid",
              "hintText": "Bounceid",
              "helpText": "Bounceid",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "realcid",
              "name": "Realcid",
              "hintText": "Realcid",
              "helpText": "Realcid",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "sendid",
              "name": "Sendid",
              "hintText": "Sendid",
              "helpText": "Sendid",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "threadid",
              "name": "Threadid",
              "hintText": "Threadid",
              "helpText": "Threadid",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "seriesid",
              "name": "Seriesid",
              "hintText": "Seriesid",
              "helpText": "Seriesid",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "formid",
              "name": "Formid",
              "hintText": "Formid",
              "helpText": "Formid",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "basetemplateid",
              "name": "Basetemplateid",
              "hintText": "Basetemplateid",
              "helpText": "Basetemplateid",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "basemessageid",
              "name": "Basemessageid",
              "hintText": "Basemessageid",
              "helpText": "Basemessageid",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "addressid",
              "name": "Addressid",
              "hintText": "Addressid",
              "helpText": "Addressid",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "source",
              "name": "Source",
              "hintText": "Source",
              "helpText": "Source",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "name",
              "name": "Name",
              "hintText": "Name",
              "helpText": "Name",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "cdate",
              "name": "Cdate",
              "hintText": "Cdate",
              "helpText": "Cdate",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "mdate",
              "name": "Mdate",
              "hintText": "Mdate",
              "helpText": "Mdate",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "send_amt",
              "name": "Send Amt",
              "hintText": "Send Amt",
              "helpText": "Send Amt",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "total_amt",
              "name": "Total Amt",
              "hintText": "Total Amt",
              "helpText": "Total Amt",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "opens",
              "name": "Opens",
              "hintText": "Opens",
              "helpText": "Opens",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "uniqueopens",
              "name": "Uniqueopens",
              "hintText": "Uniqueopens",
              "helpText": "Uniqueopens",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "linkclicks",
              "name": "Linkclicks",
              "hintText": "Linkclicks",
              "helpText": "Linkclicks",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "uniquelinkclicks",
              "name": "Uniquelinkclicks",
              "hintText": "Uniquelinkclicks",
              "helpText": "Uniquelinkclicks",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "subscriberclicks",
              "name": "Subscriberclicks",
              "hintText": "Subscriberclicks",
              "helpText": "Subscriberclicks",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "forwards",
              "name": "Forwards",
              "hintText": "Forwards",
              "helpText": "Forwards",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "uniqueforwards",
              "name": "Uniqueforwards",
              "hintText": "Uniqueforwards",
              "helpText": "Uniqueforwards",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "hardbounces",
              "name": "Hardbounces",
              "hintText": "Hardbounces",
              "helpText": "Hardbounces",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "softbounces",
              "name": "Softbounces",
              "hintText": "Softbounces",
              "helpText": "Softbounces",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "unsubscribes",
              "name": "Unsubscribes",
              "hintText": "Unsubscribes",
              "helpText": "Unsubscribes",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "unsubreasons",
              "name": "Unsubreasons",
              "hintText": "Unsubreasons",
              "helpText": "Unsubreasons",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "updates",
              "name": "Updates",
              "hintText": "Updates",
              "helpText": "Updates",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "socialshares",
              "name": "Socialshares",
              "hintText": "Socialshares",
              "helpText": "Socialshares",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "replies",
              "name": "Replies",
              "hintText": "Replies",
              "helpText": "Replies",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "uniquereplies",
              "name": "Uniquereplies",
              "hintText": "Uniquereplies",
              "helpText": "Uniquereplies",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "status",
              "name": "Status",
              "hintText": "Status",
              "helpText": "Status",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "public",
              "name": "Public",
              "hintText": "Public",
              "helpText": "Public",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "mail_transfer",
              "name": "Mail Transfer",
              "hintText": "Mail Transfer",
              "helpText": "Mail Transfer",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "mail_send",
              "name": "Mail Send",
              "hintText": "Mail Send",
              "helpText": "Mail Send",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "mail_cleanup",
              "name": "Mail Cleanup",
              "hintText": "Mail Cleanup",
              "helpText": "Mail Cleanup",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "mailer_log_file",
              "name": "Mailer Log File",
              "hintText": "Mailer Log File",
              "helpText": "Mailer Log File",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "tracklinks",
              "name": "Tracklinks",
              "hintText": "Tracklinks",
              "helpText": "Tracklinks",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "tracklinksanalytics",
              "name": "Tracklinksanalytics",
              "hintText": "Tracklinksanalytics",
              "helpText": "Tracklinksanalytics",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "trackreads",
              "name": "Trackreads",
              "hintText": "Trackreads",
              "helpText": "Trackreads",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "trackreadsanalytics",
              "name": "Trackreadsanalytics",
              "hintText": "Trackreadsanalytics",
              "helpText": "Trackreadsanalytics",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "analytics_campaign_name",
              "name": "Analytics Campaign Name",
              "hintText": "Analytics Campaign Name",
              "helpText": "Analytics Campaign Name",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "tweet",
              "name": "Tweet",
              "hintText": "Tweet",
              "helpText": "Tweet",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "facebook",
              "name": "Facebook",
              "hintText": "Facebook",
              "helpText": "Facebook",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "survey",
              "name": "Survey",
              "hintText": "Survey",
              "helpText": "Survey",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "embed_images",
              "name": "Embed Images",
              "hintText": "Embed Images",
              "helpText": "Embed Images",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "htmlunsub",
              "name": "Htmlunsub",
              "hintText": "Htmlunsub",
              "helpText": "Htmlunsub",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "textunsub",
              "name": "Textunsub",
              "hintText": "Textunsub",
              "helpText": "Textunsub",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "recurring",
              "name": "Recurring",
              "hintText": "Recurring",
              "helpText": "Recurring",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "willrecur",
              "name": "Willrecur",
              "hintText": "Willrecur",
              "helpText": "Willrecur",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "split_type",
              "name": "Split Type",
              "hintText": "Split Type",
              "helpText": "Split Type",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "split_content",
              "name": "Split Content",
              "hintText": "Split Content",
              "helpText": "Split Content",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "split_offset",
              "name": "Split Offset",
              "hintText": "Split Offset",
              "helpText": "Split Offset",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "split_offset_type",
              "name": "Split Offset Type",
              "hintText": "Split Offset Type",
              "helpText": "Split Offset Type",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "split_winner_messageid",
              "name": "Split Winner Messageid",
              "hintText": "Split Winner Messageid",
              "helpText": "Split Winner Messageid",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "split_winner_awaiting",
              "name": "Split Winner Awaiting",
              "hintText": "Split Winner Awaiting",
              "helpText": "Split Winner Awaiting",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "responder_offset",
              "name": "Responder Offset",
              "hintText": "Responder Offset",
              "helpText": "Responder Offset",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "responder_type",
              "name": "Responder Type",
              "hintText": "Responder Type",
              "helpText": "Responder Type",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "responder_existing",
              "name": "Responder Existing",
              "hintText": "Responder Existing",
              "helpText": "Responder Existing",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "reminder_field",
              "name": "Reminder Field",
              "hintText": "Reminder Field",
              "helpText": "Reminder Field",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "reminder_format",
              "name": "Reminder Format",
              "hintText": "Reminder Format",
              "helpText": "Reminder Format",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "reminder_type",
              "name": "Reminder Type",
              "hintText": "Reminder Type",
              "helpText": "Reminder Type",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "reminder_offset",
              "name": "Reminder Offset",
              "hintText": "Reminder Offset",
              "helpText": "Reminder Offset",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "reminder_offset_type",
              "name": "Reminder Offset Type",
              "hintText": "Reminder Offset Type",
              "helpText": "Reminder Offset Type",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "reminder_offset_sign",
              "name": "Reminder Offset Sign",
              "hintText": "Reminder Offset Sign",
              "helpText": "Reminder Offset Sign",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "activerss_interval",
              "name": "Activerss Interval",
              "hintText": "Activerss Interval",
              "helpText": "Activerss Interval",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "activerss_items",
              "name": "Activerss Items",
              "hintText": "Activerss Items",
              "helpText": "Activerss Items",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "ip4",
              "name": "Ip4",
              "hintText": "Ip4",
              "helpText": "Ip4",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "laststep",
              "name": "Laststep",
              "hintText": "Laststep",
              "helpText": "Laststep",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "managetext",
              "name": "Managetext",
              "hintText": "Managetext",
              "helpText": "Managetext",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "schedule",
              "name": "Schedule",
              "hintText": "Schedule",
              "helpText": "Schedule",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "waitpreview",
              "name": "Waitpreview",
              "hintText": "Waitpreview",
              "helpText": "Waitpreview",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "replysys",
              "name": "Replysys",
              "hintText": "Replysys",
              "helpText": "Replysys",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "created_timestamp",
              "name": "Created Timestamp",
              "hintText": "Created Timestamp",
              "helpText": "Created Timestamp",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "updated_timestamp",
              "name": "Updated Timestamp",
              "hintText": "Updated Timestamp",
              "helpText": "Updated Timestamp",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "ip",
              "name": "Ip",
              "hintText": "Ip",
              "helpText": "Ip",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "can_skip_approval",
              "name": "Can Skip Approval",
              "hintText": "Can Skip Approval",
              "helpText": "Can Skip Approval",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "use_quartz_scheduler",
              "name": "Use Quartz Scheduler",
              "hintText": "Use Quartz Scheduler",
              "helpText": "Use Quartz Scheduler",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "verified_opens",
              "name": "Verified Opens",
              "hintText": "Verified Opens",
              "helpText": "Verified Opens",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "verified_unique_opens",
              "name": "Verified Unique Opens",
              "hintText": "Verified Unique Opens",
              "helpText": "Verified Unique Opens",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "segmentname",
              "name": "Segmentname",
              "hintText": "Segmentname",
              "helpText": "Segmentname",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "has_predictive_content",
              "name": "Has Predictive Content",
              "hintText": "Has Predictive Content",
              "helpText": "Has Predictive Content",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "message_id",
              "name": "Message Id",
              "hintText": "Message Id",
              "helpText": "Message Id",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "screenshot",
              "name": "Screenshot",
              "hintText": "Screenshot",
              "helpText": "Screenshot",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "campaign_message_id",
              "name": "Campaign Message Id",
              "hintText": "Campaign Message Id",
              "helpText": "Campaign Message Id",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "ed_version",
              "name": "Ed Version",
              "hintText": "Ed Version",
              "helpText": "Ed Version",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "format",
              "name": "Format",
              "hintText": "Format",
              "helpText": "Format",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "links",
              "name": "Links",
              "hintText": "Links",
              "helpText": "Links",
              "isExtendedSchema": false,
              "required": false,
              "type": "object",
              "controlType": "object",
              "properties": [
                {
                  "key": "user",
                  "name": "User",
                  "hintText": "User",
                  "helpText": "User",
                  "isExtendedSchema": false,
                  "required": false,
                  "type": "string",
                  "controlType": "text"
                },
                {
                  "key": "automation",
                  "name": "Automation",
                  "hintText": "Automation",
                  "helpText": "Automation",
                  "isExtendedSchema": false,
                  "required": false,
                  "type": "string",
                  "controlType": "text"
                },
                {
                  "key": "campaignMessage",
                  "name": "Campaign Message",
                  "hintText": "Campaign Message",
                  "helpText": "Campaign Message",
                  "isExtendedSchema": false,
                  "required": false,
                  "type": "string",
                  "controlType": "text"
                },
                {
                  "key": "campaignMessages",
                  "name": "Campaign Messages",
                  "hintText": "Campaign Messages",
                  "helpText": "Campaign Messages",
                  "isExtendedSchema": false,
                  "required": false,
                  "type": "string",
                  "controlType": "text"
                },
                {
                  "key": "links",
                  "name": "Links",
                  "hintText": "Links",
                  "helpText": "Links",
                  "isExtendedSchema": false,
                  "required": false,
                  "type": "string",
                  "controlType": "text"
                },
                {
                  "key": "aggregateRevenues",
                  "name": "Aggregate Revenues",
                  "hintText": "Aggregate Revenues",
                  "helpText": "Aggregate Revenues",
                  "isExtendedSchema": false,
                  "required": false,
                  "type": "string",
                  "controlType": "text"
                },
                {
                  "key": "segment",
                  "name": "Segment",
                  "hintText": "Segment",
                  "helpText": "Segment",
                  "isExtendedSchema": false,
                  "required": false,
                  "type": "string",
                  "controlType": "text"
                },
                {
                  "key": "campaignLists",
                  "name": "Campaign Lists",
                  "hintText": "Campaign Lists",
                  "helpText": "Campaign Lists",
                  "isExtendedSchema": false,
                  "required": false,
                  "type": "string",
                  "controlType": "text"
                }
              ]
            },
            {
              "key": "id",
              "name": "Id",
              "hintText": "Id",
              "helpText": "Id",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            },
            {
              "key": "user",
              "name": "User",
              "hintText": "User",
              "helpText": "User",
              "isExtendedSchema": false,
              "required": false,
              "type": "string",
              "controlType": "text"
            }
          ]
        },
    },
    test : async connection => {
      try{
        let headers = {
          "Api-Token" : connection.input.apiKey
        }
        let url = "https://quickwork32115.activehosted.com/api/3/users/me";

        let response= await HttpUtils.request(url, headers);
        if (response.success == true) {
          return HttpUtils.successResponse(response.body);
        } else {
          return HttpUtils.errorResponse(response.message, response.statusCode);
        }
      }catch(error){
        return HttpUtils.errorResponse(error.message)
      } 
    },
    
};


module.exports = app;