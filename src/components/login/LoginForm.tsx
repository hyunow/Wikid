import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Button from "@components/Button";
import Input from "@components/Input";
import Toast from "@components/Toast";
import useLoginValidation from "@hooks/useLoginValidation";
import useToast from "@hooks/useToast";
import { useAuth } from "@context/AuthContext";
import { postSignIn } from "@lib/api/authApi";
import axios from "@lib/api/axios";

const LoginForm = () => {
  const { toastOpened, showToast } = useToast();
  const [toastText, setToastText] = useState("");
  const [toastColor, setToastColor] = useState("");

  const { formData, errors, handleChange, handleBlur } = useLoginValidation();
  const router = useRouter();
  const { login } = useAuth();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const response = await postSignIn({ email, password });

      if (response.status === 200) {
        const { accessToken, refreshToken } = response.data;
        Cookies.set("accessToken", accessToken, { secure: true });
        Cookies.set("refreshToken", refreshToken, { secure: true });

        login();
        window.location.reload(); // 로그인/로그아웃 후, 새로고침 해야 헤더가 변경됨
        router.push("/"); // 로그인 성공 후 메인페이지로 이동
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        setToastText("이메일과 비밀번호를 다시 확인하세요");
        setToastColor("red");
        showToast();
      } else {
        setToastText("로그인 실패");
        setToastColor("red");
        showToast();
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-[50px]">
      <h1 className="text-[24px] font-semibold text-gray500">로그인</h1>
      <form className="flex flex-col gap-[24px]" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-[32px]">
          <div className="flex flex-col gap-[10px]">
            <label>이메일</label>
            <Input
              type="email"
              name="email"
              placeholder="이메일을 입력해 주세요"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <label>비밀번호</label>
            <Input
              type="password"
              name="password"
              placeholder="비밀번호를 입력해 주세요"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
            />
          </div>
        </div>
        <Button
          text="로그인"
          color="green"
          type="submit"
          className="h-[45px] w-[400px]"
        />
        <Toast type={toastColor} isToastOpened={toastOpened}>
          {toastText}
        </Toast>
      </form>
    </div>
  );
};

export default LoginForm;
