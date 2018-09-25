# -*- coding: utf-8 -*-
# Copyright (c) 2018, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class Candidate(Document):
    def validate(self):
        self.validate_levels()
    def validate_levels(self):
        if self.passport and self.photo:
            if self.offer_letter:
                if self.premedical:
                    if  self.visa_applied:
                        if self.visa and self.visa_expiry_date:
                            if self.poe:
                                if self.ticket:
                                    if self.ticket_date:
                                        self.candidate_status = 'Onboarded'
                                    else:
                                        self.candidate_status = 'Ticket Issued'
                                else:
                                    self.candidate_status = 'POE Cleared'
                            else:
                                self.candidate_status = 'Visa Issued'
                        else:
                            self.candidate_status = 'Visa Applied'        
                    else:
                        self.candidate_status = 'Medical Confirmed'
                else:
                    self.candidate_status = 'Selection Confirmed'
            else:
                self.candidate_status = 'Preliminary Selection'
        else:
            self.candidate_status = ''