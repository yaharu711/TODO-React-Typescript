import {
  ImcompletedTodoType,
  UpdateTodoDetailParams,
  UpdateTodoParams,
} from "../../types";
import ImcompletedTodo from "../ImcompletedTodo/ImcompletedTodo";
import styles from "./ImcompletedTodos.module.css";
import ImcompletedTodoForPending from "../ImcompletedTodoForPending/ImcompletedTodoForPending";
import IconButton from "../../../../components/IconButton";
import { GrSort } from "react-icons/gr";
import UseImcompletedTodosViewModel from "./useImcompletedTodosViewModel";
import Button from "../../../../components/Button";

type Props = {
  todos: ImcompletedTodoType[];
  creatingTodoForPending: string;
  isPendingForCreateTodo: boolean;
  updateTodo: ({ params, successMessage }: UpdateTodoParams) => void;
  updateTodoDetail: (props: UpdateTodoDetailParams) => void;
  deleteTodo: (id: number) => void;
};

const ImcompletedTodos = ({
  todos,
  creatingTodoForPending,
  isPendingForCreateTodo,
  updateTodo,
  updateTodoDetail,
  deleteTodo,
}: Props) => {
  const { isSortMode, toggleSortMode, saveSorted } =
    UseImcompletedTodosViewModel();
  return (
    <section className={styles.wrap}>
      <h2>未完了のTODO</h2>
      <div className={styles.sortIcon}>
        {isSortMode ? (
          <Button
            onClick={saveSorted}
            style={{ width: "70px", height: "50px" }}
          >
            完了
          </Button>
        ) : (
          <IconButton
            onClick={toggleSortMode}
            children={<GrSort size={25} color="rgba(255, 255, 255, 0.9)" />}
          />
        )}
      </div>
      <ul className={styles.ul}>
        {isPendingForCreateTodo && (
          <ImcompletedTodoForPending
            todoName={creatingTodoForPending}
            isPendingForImcompleteTodo={true}
          />
        )}
        {todos.map((todo) => {
          if (
            todo.updateDetailStatus === "pending" ||
            todo.updateTodoStatus === "add_pending"
          )
            return (
              <ImcompletedTodoForPending
                key={todo.id + "add_pending"}
                todoName={todo.name}
                //ここはImcompleteではなく、Addにしたい→実際の使われ方はAddだから→未完了以外にも作成も編集時も使うため
                isPendingForImcompleteTodo={true}
              />
            );
          if (todo.updateTodoStatus === "delete_pending")
            return (
              <ImcompletedTodoForPending
                key={todo.id + "delete_pending"}
                todoName={todo.name}
                // TODO: ここはCompleteではなくDeleteにしたい
                isPendingForCompleteTodo={true}
              />
            );
          if (todo.updateDetailStatus === "error") {
            return (
              <ImcompletedTodo
                key={todo.id + "error"}
                target={todo}
                updateTodo={updateTodo}
                updateTodoDetail={updateTodoDetail}
                deleteTodo={deleteTodo}
                isError={true}
              />
            );
          }

          return (
            <ImcompletedTodo
              key={todo.id}
              target={todo}
              updateTodo={updateTodo}
              updateTodoDetail={updateTodoDetail}
              deleteTodo={deleteTodo}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default ImcompletedTodos;
