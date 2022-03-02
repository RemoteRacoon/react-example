import { FC, useState } from "react";
import classes from './Styles.module.scss';
import Image from "next/image";
import AttachementI from '@/icons/Attachement/attachement.svg';
import Input from "../Input";
import TickIcon from '@/icons/Success/tick.svg';
import sharedCls from 'styles/shared.module.scss';
import AttachArea from "./AttachArea";

interface AttachementI {
  as: 'button' | 'dropbox',
  label: string,
  name: string,
  onChange: Function,
  multiple: boolean,
  beenSent?: boolean
}

const Attachement: FC<AttachementI> = (props) => {
  const [file, setFile] = useState<File>(null);

  const {
    as,
    label,
    onChange,
    multiple,
    beenSent
  } = props;

  const removeFile = () => {
    setFile(null);
    onChange(null);
  }

  const handleFileChange = (file: File) => {
    setFile(file);
    onChange(file);
  }

  return (
    <div className={classes.container}>
      <span className={sharedCls.label}>{label}</span>

      {file &&
        <div className={classes.container}>
          <Input
            placeholder={file.name}
            icon={{
              position: 'left',
              path: AttachementI,
            }}
            withCloseIcon
            onClose={removeFile}
            customClasses={classes.file}
            type="text"
            disabled
          />
          {beenSent && <div className={classes.container__success}>
            <Image src={TickIcon} />
          </div>}
        </div>

      }

      {!file &&
        <AttachArea
          onChange={handleFileChange}
          multiple={multiple}
          displayAs={as}
          accept={['.pdf', '.docx']}
        />
      }
    </div>
  )
}

Attachement.defaultProps = {
  beenSent: false
}

export default Attachement;