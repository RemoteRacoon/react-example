import { AxiosResponse } from 'axios';
import { saveAs } from 'file-saver';

const downloadFile = <T extends AxiosResponse>(response: T) => {
  const filename = response.headers['content-disposition'].split('filename=')[1];
  const type = response.headers['content-type'];
  const blob = new Blob(response.data, { type });
  saveAs(blob, filename);
};

export default downloadFile;
