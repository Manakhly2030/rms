// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on('Candidate', {
    validate:function(frm){
        var template = `<img width="145px" height="188px" alt="Finger Image" src="/files/fp.gif">`;
        cur_frm.fields_dict.fp_image.$wrapper.html(template)
    },
    refresh:function(frm){
        frm.toggle_display("fingerprint_verification",frm.doc.fp_template);
        frm.toggle_display("capture_fingerprint", !frm.doc.fp_template);
        if(frm.doc.fp_template){
        	frm.add_custom_button(__("FP Attached"),function(){}).addClass('btn btn-success')
        }
        },
    date_of_birth: function(frm, cdt, cdn){
        var dob = new Date(frm.doc.date_of_birth);
        var now = new Date();
        var age_now = now.getFullYear() - dob.getFullYear();
        cur_frm.set_value("age", age_now);
        cur_frm.refresh();
        },    
	onload: function(frm) {
        var template = `<img width="200px" height="200px" alt="Finger Image" src="/files/fp.gif">`;
        cur_frm.fields_dict.fp_image.$wrapper.html(template);
        frm.toggle_display("fingerprint_verification",frm.doc.fp_template);
        frm.toggle_display("capture_fingerprint", !frm.doc.fp_template);
	    $(cur_frm.fields_dict.passport_no.input).attr("maxlength","8");
    },
    project: function(frm, dt, dn){
        if (frm.doc.project){
        var i = frm.doc.project;
        frm.set_query("position", function(frm){
            return {
              filters: {
                 "project": i
                }
         }
    })
    frm.clear_table("interview_panel");
    frappe.call({
        "method":"frappe.client.get",
        args: {
            doctype: "Project",
             name: frm.doc.project
         },
         callback: function (r) { 
             $.each(r.message.direct_interview_details, function(i, d) {
                    if(frappe.datetime.get_today() === d.interview_date){
                        frm.set_value("interview_date",d.interview_date);
                        frm.set_value("interview_location",d.interview_location);
                    }
                    //   if(r.message.direct_interview_details){
                    //     var row = frappe.model.add_child(frm.doc, "Direct Interview Details", "interview_panel");         
                    //   if(frappe.datetime.get_today() === d.interview_date)
                    //   {
                    //   row.interview_date = d.interview_date;
                    //   row.interview_location = d.interview_location;
                    //   }

                    //   }
                    //   refresh_field("interview_panel"); 
              });
          }
     })
    }
},
	capture_photo: function (frm) {
        // capture: (context) => {
        // var ui = $.summernote.ui;
        const capture = new frappe.ui.Capture();
        capture.open();

        capture.click((data) => {
            frm.set_value("photo", data)
            // context.invoke('editor.insertImage', data);
        });
        // },
    },
	verify: function (frm) {
        frappe.call({
            method: "rms.recruitment_management_system.custom.verify_fp",
            args: {
                "fp": frm.doc.fp_template
            },
            freeze:true,
            freeze_message: __("Verifying"),
            callback: function (r) {
                if (r.message === 'Verified') {
                    frappe.msgprint(__(r.message))
                }
                else {
                    frappe.msgprint(__(r.message))
                }
            }
        })
	},
	capture: function (frm) {
        // setTimeout(function() { 
            frappe.call({
                method: "rms.recruitment_management_system.custom.capture_fp",
                args: {
                    "name": frm.doc.name
                },
                freeze:true,
                freeze_message: __("Capturing"),
                callback: function (r) {
                        frm.set_value("fp_template", r.message[0])
                        var test = r.message[1]
                        var template = `<img width="145px" height="188px" alt="Finger Image" src="data:image/bmp;base64,${test}">`;
                        cur_frm.fields_dict.fp_image.$wrapper.html(template);
                }
            })
        //  }, 3000);

		
    }
});


// frappe.ui.form.on("Candidate", {
// 	onload:function(frm){
// 	frm.toggle_display("fingerprint_verification",frm.doc.fp_template);
// 	$(cur_frm.fields_dict.passport_no.input).attr("maxlength","8");
// 	},
// 	,
	
	
       
// });

// window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;//compatibility for Firefox and chrome
		// var pc = new RTCPeerConnection({iceServers:[]}), noop = function(){};      
		// pc.createDataChannel('');//create a bogus data channel
		// pc.createOffer(pc.setLocalDescription.bind(pc), noop);// create offer and set local description
		// pc.onicecandidate = function(ice)
		// {
		// if (ice && ice.candidate && ice.candidate.candidate)
		// {
		// var localip = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
        // console.log(localip)
        // pc.onicecandidate = noop;
		// }
		// };

        

// window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;//compatibility for Firefox and chrome
		// var pc = new RTCPeerConnection({iceServers:[]}), noop = function(){};      
		// pc.createDataChannel('');//create a bogus data channel
		// pc.createOffer(pc.setLocalDescription.bind(pc), noop);// create offer and set local description
		// pc.onicecandidate = function(ice)
		// {
		// if (ice && ice.candidate && ice.candidate.candidate)
		// {
		// var localip = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
		// pc.onicecandidate = noop;
		// }
		// };

		
		// window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection || false;
		// // localip = []
		// if (window.RTCPeerConnection)
		// {
		// ip = [];
		// var pc = new RTCPeerConnection({iceServers:[]}), noop = function(){};
		// pc.createDataChannel('');
		// pc.createOffer(pc.setLocalDescription.bind(pc), noop);

		// pc.onicecandidate = function(event)
		// {
		// if (event && event.candidate && event.candidate.candidate)
		// {
		// 	var s = event.candidate.candidate.split('\n');
		// 	ip.push(s[0].split(' ')[4]);
		// 	console.log(ip)
		// 	// localip.push(ip[0])
		// 	// return ip
		// }
		// }
		// }
		// console.log(ip);
		
		
 
        
