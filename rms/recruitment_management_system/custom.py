# -*- coding: utf-8 -*-
# Copyright (c) 2017, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
import requests


@frappe.whitelist()
def capture_fp(name,localip):
    jsondata = {'Quality': '', 'Timeout': ''}
    url = 'http://'+localip+':8004/mfs100/capture'
    frappe.errprint(url)
    r = requests.post(
        url, data=jsondata,timeout=5)
    status = r.json()
    if 'IsoTemplate' in status:
        return status['IsoTemplate'], status['BitmapData']


@frappe.whitelist()
def verify_fp(fp,localip):
    url = 'http://'+localip+':8004/mfs100/match' 
    frappe.errprint(url)   
    jsondata = {'BioType': 'FMR', 'GalleryTemplate': fp}
    r = requests.post(url, data=jsondata)
    status = r.json()
    # if not status['ErrorCode'] == '-1307':
    if 'Status' in status:
        return 'Verified'
    else:
        return 'Not Verified'
    # else:
    #     return 'MFS 100 Not Found'
