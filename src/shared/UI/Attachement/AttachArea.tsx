import { FC } from "react";
import { useDropzone } from "react-dropzone";
import classes from './Styles.module.scss';
import DownloadI from '@/icons/Download/index.svg';
import Image from "next/image";
import sharedCls from 'styles/shared.module.scss';
import Button from "../Button";

interface AttachAreaI {
  onChange: (file: File | File[]) => any,
  displayAs: 'button' | 'dropbox',
  accept: string[], // ['.docx', '.pdf', etc]
  multiple: boolean
}

const AttachArea: FC<AttachAreaI> = (props) => {
  const { onChange, displayAs, accept, multiple } = props;

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length !== 0) {
      const data = multiple ? acceptedFiles : acceptedFiles[0];
      onChange(data);
    }
  }

  const { fileRejections, getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: accept.join(', ')
  });

  return (
    <>
      {displayAs === 'dropbox' ?
        <>
          <div
            {...getRootProps()}
            role={'none'}
            className={isDragActive ? classes['dropbox-bordered'] : classes.dropbox}
          >
            <input {...getInputProps()} multiple={multiple} />
            <Image src={DownloadI} alt='Загрузить' />
            <span>загрузить документ</span>
          </div>
          {fileRejections.map(({ errors }) => {
            return errors.map(error =>
              <span key={error.code}>
                {showErrorMessage(error.code, accept)}
              </span>
            )
          })}
        </>

        :
        <div {...getRootProps()}>
          <input {...getInputProps()} multiple={multiple} />
          <Button className={classes.button}>
            прикрепить
          </Button>
        </div>
      }
    </>

  )
}

function showErrorMessage(code: string, accept: string[]) {
  const acceptFormatted = accept.map(file => file.replace('.', '')).join(', ');

  switch (code) {
    case 'file-invalid-type':
      return (
        <div className={classes['error-area']}>
          <span className={sharedCls.error}>Недопустимый формат файла.</span>
          <span className={sharedCls.error}>Загрузите {acceptFormatted}</span>
        </div>
      )
    default:
      return '';
  }
}

export default AttachArea;