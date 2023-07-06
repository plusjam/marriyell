import Image from "next/image";
import Images from "../../styles/atoms/Images.module.scss";
import Styles from "../../styles/mols/ImagesView.module.scss";

type Props = {
  copy?: string;
  description?: string;
  image02: string;
  spImage02: string;
  image03: string;
  spImage03: string;
  image04: string;
  spImage04: string;
  reverse?: boolean;
};

const ImagesView = (props: Props) => {
  const { copy, description, image02, spImage02, image03, spImage03, image04, spImage04, reverse = false } = props;

  return (
    <div className={reverse ? `${Styles.container} ${Styles.reverse}` : Styles.container}>
      <div className={Styles.main}>
        <div className={Styles.image02}>
          <Image src={image02} alt="" width={600} height={593} className={`${Images.pc} fadein`} />
          <Image src={spImage02} alt="" width={375} height={256} className={`${Images.sp} fadein`} />
        </div>
        {copy && description && (
          <div className={Styles.contents}>
            <div className={Styles.copy}>{copy}</div>
            <div className={Styles.description} dangerouslySetInnerHTML={{ __html: description }}></div>
          </div>
        )}
      </div>
      <div className={Styles.images}>
        <div className={Styles.image03}>
          <Image src={image03} alt="" width={306} height={306} className={`${Images.pc} fadein`} />
          <Image src={spImage03} alt="" width={160} height={160} className={`${Images.sp} fadein`} />
        </div>
        <div className={Styles.image04}>
          <Image src={image04} alt="" width={306} height={306} className={`${Images.pc} fadein`} />
          <Image src={spImage04} alt="" width={160} height={160} className={`${Images.sp} fadein`} />
        </div>
      </div>
    </div>
  );
};

export default ImagesView;
