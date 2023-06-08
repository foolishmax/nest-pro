import { useMutation } from '@apollo/client';
import { Button, Form, ImageUploader, Input } from 'antd-mobile';
import classNames from 'classnames';
import styles from './App.module.less';
import { UPDATE } from './graphql/demo';
import { useUploadOSS } from './hooks/useUploadOSS';

function App() {
  const uploadHandler = useUploadOSS();
  const [update] = useMutation(UPDATE);

  const onClickHandler = (value: any) => {
    update({
      variables: {
        id: 21,
        params: {
          ...value,
        },
      },
    });
  };

  return (
    <div>
      <Form
        className={classNames(styles.form, styles.formPadding)}
        layout="horizontal"
        onFinish={onClickHandler}
        footer={
          <Button block type="submit" color="primary" size="large">
            提交
          </Button>
        }
      >
        <Form.Item name="name" label="姓名">
          <Input />
        </Form.Item>
        <Form.Item name="desc" label="描述">
          <Input />
        </Form.Item>
        <Form.Item name="actor" label="头像">
          <ImageUploader upload={uploadHandler} />
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;
