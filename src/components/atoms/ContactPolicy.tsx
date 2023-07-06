import Link from "next/link";
import React from "react";
import Styles from "@/styles/orgs/ContactForm.module.scss";

const ContactPolicy = () => {
  return (
    <p className={Styles.policy}>
      <Link href="https://marriyellclub.co.jp/company/privacypolicy.html" target="_blank" rel="noopener noreferrer" className={Styles.link}>
        プライバシーポリシー
      </Link>
      をよくお読みいただき同意いただけましたら下のボタンを押してください。
      <br /> ご不明点やご質問に関しては、
      <Link href="/faq" className={Styles.link} rel="noopener noreferrer">
        よくあるご質問
      </Link>
      のページもご参照ください。
    </p>
  );
};

export default ContactPolicy;
