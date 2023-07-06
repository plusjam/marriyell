import Image from "next/image";
import Link from "next/link";
import Images from "../../styles/atoms/Images.module.scss";
import Styles from "../../styles/mols/ContentsAndImage.module.scss";
import IconArrow from "../atoms/IconArrow";

type Props = {
  en?: string;
  ja?: string;
  description: string;
  href?: string;
  image: string;
  spImage: string;
  reverse?: boolean;
};

const ContentsAndImage = (props: Props) => {
  const { en, ja, description, href, image, spImage, reverse = false } = props;

  return (
    <div className={reverse ? `${Styles.item} ${Styles.reverse} fadein` : `${Styles.item} fadein`} id={en && en.toLocaleLowerCase().replaceAll(" ", "_")}>
      <div className={Styles.contents}>
        <div className={Styles.title}>
          {en && <div className={Styles.en}>{en}</div>}
          {ja && <h3 className={Styles.ja}>{ja}</h3>}
        </div>

        <div
          className={Styles.description}
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        ></div>
        {href && (
          <Link className={Styles.link} href={href}>
            Read more
            <span className={Styles.arrow}>
              <IconArrow />
            </span>
          </Link>
        )}
      </div>
      <div className={Styles.image}>
        <Image src={image} alt="" width={909} height={531} className={`${Images.pc} fadein`} />
        <Image src={spImage} alt="" width={297} height={425} className={`${Images.sp} fadein`} />
      </div>
    </div>
  );
};

export default ContentsAndImage;
