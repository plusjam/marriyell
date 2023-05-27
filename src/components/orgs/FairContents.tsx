import React from "react";
import Styles from "../../styles/orgs/FairContents.module.scss";
import Image from "next/image";
import { FairList } from "../../../typings/fair";

type Props = {
  fairList: FairList;
};

const FairContents = (props: Props) => {
  const { fairList } = props;

  return (
    <section className={Styles.section}>
      <div className={Styles.container}>
        <div className={Styles.head}>フェア内容</div>
        <div className={Styles.body}>
          {fairList.contents.articles.map((content, index) => {
            return (
              <div className={Styles.block} key={index}>
                <div className={Styles.image}>
                  <Image src={content.image?.url ? content.image.url : "/images/sample124.jpg"} alt="" width={130} height={130} />
                </div>
                <div className={Styles.title}>{content.title}</div>
                <div className={Styles.description}>{content.description}</div>
              </div>
            );
          })}
          {/* <div className={Styles.block}>
            <div className={Styles.image}>
              <Image src="/images/" alt="" width={130} height={130} />
            </div>
            <div className={Styles.title}>相談会</div>
            <div className={Styles.description}>
              【初めての見学・列席経験ゼロでも大丈夫】日程、ご予算など大切なポイントはもちろん、実例を交えながら当日の過ごし方をご提案！初めてのご見学や列席経験がなくても大丈夫！
            </div>
          </div>
          <div className={Styles.block}>
            <div className={Styles.image}>
              <Image src="/images/" alt="" width={130} height={130} />
            </div>
            <div className={Styles.title}>相談会</div>
            <div className={Styles.description}>
              【初めての見学・列席経験ゼロでも大丈夫】日程、ご予算など大切なポイントはもちろん、実例を交えながら当日の過ごし方をご提案！初めてのご見学や列席経験がなくても大丈夫！
            </div>
          </div>
          <div className={Styles.block}>
            <div className={Styles.image}>
              <Image src="/images/" alt="" width={130} height={130} />
            </div>
            <div className={Styles.title}>相談会</div>
            <div className={Styles.description}>
              【初めての見学・列席経験ゼロでも大丈夫】日程、ご予算など大切なポイントはもちろん、実例を交えながら当日の過ごし方をご提案！初めてのご見学や列席経験がなくても大丈夫！
            </div>
          </div>
          <div className={Styles.block}>
            <div className={Styles.image}>
              <Image src="/images/" alt="" width={130} height={130} />
            </div>
            <div className={Styles.title}>相談会</div>
            <div className={Styles.description}>
              【初めての見学・列席経験ゼロでも大丈夫】日程、ご予算など大切なポイントはもちろん、実例を交えながら当日の過ごし方をご提案！初めてのご見学や列席経験がなくても大丈夫！
            </div>
          </div>
          <div className={Styles.block}>
            <div className={Styles.image}>
              <Image src="/images/" alt="" width={130} height={130} />
            </div>
            <div className={Styles.title}>相談会</div>
            <div className={Styles.description}>
              【初めての見学・列席経験ゼロでも大丈夫】日程、ご予算など大切なポイントはもちろん、実例を交えながら当日の過ごし方をご提案！初めてのご見学や列席経験がなくても大丈夫！
            </div>
          </div>
          <div className={Styles.block}>
            <div className={Styles.image}>
              <Image src="/images/" alt="" width={130} height={130} />
            </div>
            <div className={Styles.title}>相談会</div>
            <div className={Styles.description}>
              【初めての見学・列席経験ゼロでも大丈夫】日程、ご予算など大切なポイントはもちろん、実例を交えながら当日の過ごし方をご提案！初めてのご見学や列席経験がなくても大丈夫！
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default FairContents;
