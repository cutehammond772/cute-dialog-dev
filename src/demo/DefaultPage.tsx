import { useDialogCreator } from "@lib/hooks";
import Confirm from "@demo/dialogs/confirm/Confirm";
import Chat from "@demo/dialogs/chat/Chat";

import "@demo/DefaultPage.style.css";

const DefaultPage = () => {
  const { addDialog } = useDialogCreator();

  return (
    <div className="page">
      <header className="header">
        <span className="title">@cute/dialog (beta)</span>
        <nav className="menu">
          <ul>
            <li>
              <a href="#introduction">Introduction</a>
            </li>
            <li>
              <a href="#examples">Examples</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
          </ul>
        </nav>
      </header>

      <section id="introduction" className="section">
        <span className="title">Introduction</span>
        <p>
          쉽고 간편하게 다이얼로그를 만들 수 있는 라이브러리입니다. 모달, 플로팅 버튼, 알림 등
          다양한 다이얼로그를 만들어 보세요!
        </p>
      </section>

      <section id="examples" className="section">
        <span className="title">Examples</span>
        <div className="examples">
          <button onClick={() => addDialog(Confirm)}>Add Confirm Dialog</button>
          <button onClick={() => addDialog(Chat)}>Create Chat</button>
        </div>
      </section>

      <section id="about" className="section">
        <span className="title">About</span>
      </section>
    </div>
  );
};

export default DefaultPage;
