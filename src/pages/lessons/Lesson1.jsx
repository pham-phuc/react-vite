import Header from "../../components/Header";
import Bartab from "../../components/Bartab";
const Lesson1 = () => {
  return (
    <>
      <Header></Header>
      <div className="flex w-full">
        <Bartab></Bartab>
        <div className="border body p-8 w-full">
          <div>
            <p className="mb-6 font-bold">Khởi tạo dự án</p>
            <p>
              <b>1. Khởi tạo react ts với vite</b> :
              <a href="https://vitejs.dev/guide/" target="_blank">
                https://vitejs.dev/guide/
              </a>
            </p>
            <p>
              <b>2. Sửa lại nội dung file eslint </b> :
              <a
                href="https://github.com/thangpqtechlead/test-node-example/blob/lint/.eslintrc.js"
                target="_blank"
              >
                https://github.com/thangpqtechlead/test-node-example/blob/lint/.eslintrc.js
              </a>
            </p>
            <b>3. Upload code lên github </b>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lesson1;
