import { useEffect, useState } from "react";
import "src/App.css";

import useInterval from "./hooks/useInterval";

function createMatrix(rows: number, columns: number) {
  return Array.from({ length: rows }, (value1, index1) => {
    return Array.from({ length: columns }, (value2, index2) => {
      return 0;
    });
  });
}

function App() {
  const [snake, setSnake] = useState({ body: [ { x: 5, y: 5 }], direction: "up" });
  // const [snake, setSnake] = useState({ x: 5, y: 5, direction: "up" });
  const [matrix, setMatrix] = useState(createMatrix(12, 12));

  useEffect(() => {
    window.addEventListener("keydown", handleOnKeyDown);

    return () => window.removeEventListener("keydown", handleOnKeyDown);
  });

  // useEffect(() => {
  //   const intervalId = setInterval(handleSnakeDirection, 625);

  //   return () => clearInterval(intervalId);
  // });

  // useInterval(handleSnakeDirection, 625);

  // useEffect(() => {
  //   // console.log(`snake x -> ${snake.x}, snake y -> ${snake.y}`);
  //   clearMatrix();
  //   updateMatrix();
  // }, [snake.body[0].x, snake.body[0].y]);

  useEffect(() => {
    clearMatrix();
    console.log(snake.body);
    updateMatrix();
    const timeoutId = setTimeout(() => {
      printMatrix();
    }, 200);
    
    return () => clearTimeout(timeoutId);
  }, [snake.body]);

  function handleSnakeDirection() {
    console.log(snake.body);

    switch (snake.direction) {
      case "up":
        goUp();
        break;
      case "down":
        goDown();
        break;
      case "left":
        goLeft();
        break;
      case "right":
        goRight();
        break;
    }
  }

  function updateSnakeState(x: number, y: number, direction: string) {
    let prevPosX = x;
    let prevPosY = y;
    let newPosX = x;
    let newPosY = y;

    if (direction === "up") 
      newPosY = newPosY - 1;
    else if (direction === "down")
      newPosY = newPosY + 1;
    else if (direction === "left")
      newPosX = newPosX - 1;
    else if (direction === "right")
      newPosX = newPosX + 1;

    if (newPosX < 0) {
      newPosX = matrix[0].length - 1;
    }
    else if (newPosY >= 0 && newPosX > matrix[0].length - 1) {
      newPosX = 0;
    } 
    else if (newPosY < 0) {
      newPosY = matrix[0].length - 1;
    }
    else if (newPosY > matrix.length - 1) {
      newPosY = 0;
    }

    let snakeBody = [...snake.body];

    snakeBody[0].x = newPosX;
    snakeBody[0].y = newPosY;

    for (let i = 1; i < snakeBody.length; i++)
    {
        newPosX = prevPosX;
        newPosY = prevPosY;
        prevPosX = snakeBody[i].x;
        prevPosY = snakeBody[i].y;
        snakeBody[i].x = newPosX;
        snakeBody[i].y = newPosY;
    }

    setSnake((prevSnake => {
      return {
        ...prevSnake,
        body: [...snake.body],
        direction: direction
      };
    }));

    // setSnake({ ...snake, x: x, y: y, direction: direction });

    // console.log(`x: ${snake.body[0].x} , y: ${snake.body[0].y}`);
  }

  function clearMatrix() {
    // let tempMatrix = matrix;
    // for (let i = 0; i < tempMatrix.length; i++) {
    //   for (let j = 0; j < tempMatrix.length; j++) {
    //     if (tempMatrix[i][j] === 1) tempMatrix[i][j] = 0;
    //   }
    // }

    // setMatrix(tempMatrix);

    setMatrix((prevMatrix) => {
      let tempMatrix = [...prevMatrix];
      for (let i = 0; i < tempMatrix.length; i++) {
        for (let j = 0; j < tempMatrix[i].length; j++) {
          if (tempMatrix[i][j] === 1) tempMatrix[i][j] = 0;
        }
      }

      return tempMatrix;
    });
  }

  function updateMatrix() {
    setMatrix((prevMatrix) => {
      let tempMatrix = [...prevMatrix];
      snake.body.forEach((bp) => {
        tempMatrix[bp.y][bp.x] = 1;
      });

      return tempMatrix;
    });
  }

  // function updateMatrix() {
  //   setMatrix((prevMatrix) => {
  //     return prevMatrix.map((row, i) => {
  //       return row.map((col, j) => {
  //         if (i === snake.y && j === snake.x) {
  //           return 1;
  //         }

  //         return 0;
  //       });
  //     });
  //   });
  // }

  function printMatrix() {
    let temp = "";
    for (let i = 0; i < matrix.length; i++) {
      temp += "\n";
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === 0) {
          temp += "O";
        } else {
          temp += "X";
        }
      }
    }
    // console.log("MATRIX: \n", temp);
    // console.log("MATRIX(arr): \n", matrix);
    // console.log(`\nSNAKE: x: ${snake.body[0].x}, y: ${snake.body[0].y}`);
    // console.log(`\nSNAKE body: `);
    console.log(snake.body);
  }

  function goUp() {
    updateSnakeState(snake.body[0].x, snake.body[0].y, "up");
  }

  function goDown() {
    updateSnakeState(snake.body[0].x, snake.body[0].y, "down");
  }

  function goLeft() {
    updateSnakeState(snake.body[0].x, snake.body[0].y, "left");
  }

  function goRight() {
    updateSnakeState(snake.body[0].x, snake.body[0].y, "right");
  }

  // function goUp() {
  //   updateSnakeState(snake.x, --snake.y, "up");
  // }

  // function goDown() {
  //   updateSnakeState(snake.x, ++snake.y, "down");
  // }

  // function goLeft() {
  //   updateSnakeState(--snake.x, snake.y, "left");
  // }

  // function goRight() {
  //   updateSnakeState(++snake.x, snake.y, "right");
  // }

  function handleOnKeyDown(e) {
    switch (e.key) {
      case "ArrowUp":
        // if (!isDirectionValid("up")) return;

        // setSnake((prevSnake) => {
        //   return { ...prevSnake, direction: "up" };
        // });
        goUp();
        break;
      case "ArrowDown":
        // if (!isDirectionValid("down")) return;

        // setSnake((prevSnake) => {
        //   return { ...prevSnake, direction: "down" };
        // });
        goDown();
        break;
      case "ArrowLeft":
        // if (!isDirectionValid("left")) return;

        // setSnake((prevSnake) => {
        //   return { ...prevSnake, direction: "left" };
        // });
        goLeft();
        break;
      case "ArrowRight":
        // if (!isDirectionValid("right")) return;

        // setSnake((prevSnake) => {
        //   return { ...prevSnake, direction: "right" };
        // });
        goRight();
        break;
      case "j":
        makeSnakeBigger();
        break;
    }
  }

  function makeSnakeBigger() {
    let newBody = [...snake.body];
    let lastBodyPart = newBody[newBody.length - 1];
    let tempX = 0;
    let tempY = 0;


    switch(snake.direction) {
      case "up":
        tempY = lastBodyPart.y + 1 > matrix.length - 1 ? 0 : lastBodyPart.y + 1;
        newBody.push({ x: lastBodyPart.x, y: tempY});
        break;
      case "down":
        tempY = lastBodyPart.y - 1 < 0 ? matrix.length - 1 : lastBodyPart.y - 1;
        newBody.push({ x: lastBodyPart.x, y: tempY });
        break;
      case "left":
        tempX = lastBodyPart.x + 1 > matrix[lastBodyPart.y].length - 1 ? 0 : lastBodyPart.x + 1;
        newBody.push({ x: tempX, y: lastBodyPart.y});
        break;
      case "right":
        tempX = lastBodyPart.x - 1 < 0 ? matrix[lastBodyPart.y].length - 1 : lastBodyPart.x - 1;
        newBody.push({ x: tempX, y: lastBodyPart.y});
        break;
    }

    setSnake((prevSnake) => {
      return {...prevSnake, body: [...newBody]};
    });
  }

  function isDirectionValid(direction: string) {
    if (
      snake.direction === "up" &&
      (direction === "down" || direction === "up")
    )
      return false;
    else if (
      snake.direction === "down" &&
      (direction === "up" || direction === "down")
    )
      return false;
    else if (
      snake.direction === "left" &&
      (direction === "right" || direction === "left")
    )
      return false;
    else if (
      snake.direction === "right" &&
      (direction === "left" || direction === "right")
    )
      return false;

    return true;
  }

  return (
    <>
      {/* <div>
        x: {snake.x}
        y: {snake.y}
        direction: {snake.direction}
      </div> */}
      {matrix.map((row, i) => {
        return (
          <div key={i} className="row">
            {row.map((col, j) => {
              let tempClass = "col";

              // if (i === snake.y && j === snake.x) {
              //   tempClass += " dot";
              // }

              if (matrix[i][j] === 1) tempClass += " dot";

              return <div key={j} className={`${tempClass}`}></div>;
            })}
          </div>
        );
      })}
    </>
  );

  // return (
  //   <>
  //     {/* <div>
  //       x: {snake.x}
  //       y: {snake.y}
  //       direction: {snake.direction}
  //     </div> */}
  //     {matrix.map((row, i) => {
  //       return (
  //         <div key={i} className="row">
  //           {row.map((col, j) => {
  //             let tempClass = "col";

  //             // if (i === snake.y && j === snake.x) {
  //             //   tempClass += " dot";
  //             // }

  //             if (matrix[i][j] === "X") tempClass += " dot";

  //             return <div key={j} className={`${tempClass}`}></div>;
  //           })}
  //         </div>
  //       );
  //     })}
  //   </>
  // );
}

export default App;
[];
