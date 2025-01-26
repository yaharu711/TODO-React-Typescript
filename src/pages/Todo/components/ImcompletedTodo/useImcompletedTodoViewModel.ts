import { useState } from "react";
import { ImcompletedTodoType, UpdateTodoDetailParams } from "../../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export type Props = {
  target: ImcompletedTodoType;
  updateTodoDetail: (props: UpdateTodoDetailParams) => void;
};
const UseImcompletedTodoViewModel = ({ target, updateTodoDetail }: Props) => {
  const [inputedTodoName, setInputedTodoName] = useState<string>(target.name);
  const [editInputError, setEditInputError] = useState<string>("");
  const [isDisabledButton, setIsDisabledButton] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const onChangeEditMode = () => {
    // 編集モードでエラーがあるのにボタンを押されても編集モードを終わらないようにする
    if (isEditMode && editInputError !== "") return;
    setIsEditMode((prev) => !prev);
    setIsDisabledButton((prev) => !prev);
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputedTodoName(e.target.value);
    setEditInputError("");
  };

  const editTodo = (target: ImcompletedTodoType) => {
    // 変化なく何も入力していない場合は編集していなかったことにする
    if (inputedTodoName === target.name || inputedTodoName === "") {
      onChangeEditMode();
      setInputedTodoName(target.name);
      return;
    }
    if (inputedTodoName.trim() === "") {
      // 編集モードは終わらないまま編集してもらう
      setEditInputError("空白のみは許可されていません");
      return;
    }

    updateTodoDetail({
      request: {
        id: target.id,
        name: inputedTodoName,
      },
      setInputError: setEditInputError,
    });
    onChangeEditMode();
    setInputedTodoName("");
  };

  const editTodoOnKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    target: ImcompletedTodoType
  ): void => {
    if (e.key !== "Enter") return;
    editTodo(target);
    e.preventDefault();
  };

  const editTodoOnBlur = (
    e: React.FocusEvent,
    target: ImcompletedTodoType
  ): void => {
    // アイコンボタンを再度クリックした時にonChangeEditModeと競合しないようにする
    if (e.relatedTarget && e.relatedTarget.tagName === "BUTTON") {
      return;
    }
    editTodo(target);
  };

  const sortableProps = useSortable({ id: target.id });

  const sortableTodoStyle = {
    transform: CSS.Transform.toString(sortableProps.transform),
    transition: sortableProps.transition,
    // position: "relative",
    // // ドラッグ中はz-indexプロパティでコンポーネントを浮かせる
    // zIndex: sortableProps.isDragging ? 10 : 0,
  };

  return {
    inputedTodoName,
    editInputError,
    isDisabledButton,
    isEditMode,
    onChangeEditMode,
    onChangeInput,
    editTodoOnKeyDown,
    editTodoOnBlur,
    sortableProps,
    sortableTodoStyle,
  };
};

export default UseImcompletedTodoViewModel;
