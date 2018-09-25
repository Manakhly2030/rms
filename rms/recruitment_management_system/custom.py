# -*- coding: utf-8 -*-
# Copyright (c) 2017, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
import requests


@frappe.whitelist()
def capture_fp(name):
    ip= '10.8.0.3'
    jsondata = {'Quality': '', 'Timeout': ''}
    r = requests.post(
        'http://10.8.0.3:8004/mfs100/capture', data=jsondata)
    status = r.json()
    if 'IsoTemplate' in status:
        return status['IsoTemplate'], status['BitmapData']


@frappe.whitelist()
def verify_fp(fp):
    ip = '10.8.0.3'
    jsondata = {'BioType': 'FMR', 'GalleryTemplate': fp}
    r = requests.post('http://'+ip+':8004/mfs100/match', data=jsondata)
    status = r.json()
    if not status['ErrorCode'] == '-1307':
        if 'Status' in status:
            return 'Verified'
        else:
            return 'Not Verified'
    else:
        return 'MFS 100 Not Found'

# import os
# import socket

# if os.name != "nt":
#     import fcntl
#     import struct

#     def get_interface_ip(ifname):
#         s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
#         frappe.errprint(socket.AF_INET)
#         return socket.inet_ntoa(fcntl.ioctl(s.fileno(), 0x8915, struct.pack('256s',
#                                 ifname[:15]))[20:24])

# def get_lan_ip():
#     ip = socket.gethostbyname(socket.gethostname())
#     if ip.startswith("127.") and os.name != "nt":
#         interfaces = [
#             "eth0",
#             "eth1",
#             "eth2",
#             "wlan0",
#             "wlan1",
#             "wifi0",
#             "ath0",
#             "ath1",
#             "ppp0",
#             ]
#         for ifname in interfaces:
#             try:
#                 ip = get_interface_ip(ifname)
#                 break
#             except IOError:
#                 pass
#     return ip        