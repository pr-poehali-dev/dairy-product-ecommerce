import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useEmailConfig } from "./EmailConfig";
import { useContactsConfig } from "./ContactsConfig";
import ContactsSection from "./contacts/ContactsSection";

export default function Contacts() {
  return <ContactsSection />;
}
