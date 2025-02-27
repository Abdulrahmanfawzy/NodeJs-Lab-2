import http from "http";

let users = [
  { id: 1, username: "Abdulrahman", age: 24 },
  { id: 2, username: "Omar", age: 22 },
];

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type" , "application/json");
  const { url, method } = req;
  if (url == "/allUsers" && method == "GET") {
    res.end(JSON.stringify({ message: "done", users }));

  } else if (url.startsWith(`/search`) && method == "GET") {
    searchFun(res, url);
  } else if (url == "/sortedUsers" && method == "GET") {
    let sortedArr = users.sort((a, b) => a.username.localeCompare(b.username));
    res.end(JSON.stringify({ message: "done", sortedArr }));
  } else if (url == "/addUser" && method == "POST") {
    addUserFun(req, res);
  } else if (url.startsWith("/updateUser/") && method == "PUT") {
    updateUserFun(req, res, url);
  } else if (url.startsWith(`/deleteUser/`) && method == "DELETE") {
    deleteUserFun(res, url);
  }else{
    res.end(JSON.stringify({"message" : "url is not found"}))
  }
});

server.listen(4200, () => {
  console.log("connected");
});

function searchFun(res, url) {
  let id = +url.split("/")[2];
  let status = false;

  users.forEach((el) => {
    if (el.id == id) {
      status = true;
    }
  });

  if (status) {
    let userObj = users[id - 1];
    res.end(JSON.stringify({ message: "done", userObj }));
  } else {
    res.end(JSON.stringify({ message: "id is invalid" }));
  }
}

function addUserFun(req, res) {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
    let userObj = JSON.parse(data);
    let id = users[users.length - 1].id;
    userObj.id = id + 1;
    users.push(userObj);
  });

  req.on("end", () => {
    res.end(JSON.stringify({ message: "done", users }));
  });

  req.on("error", (err) => {
    res.end(JSON.stringify({ message: "error", err }));
  });
}

function updateUserFun(req, res, url) {
  let id = url.split("/")[2];
  let user = users.find((el) => el.id == id);

  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    let status = false;

    users.forEach((el) => {
      if (+id == el.id) {
        status = true;
      }
    });

    if (status) {
      user.username = JSON.parse(data).username;
      res.end(JSON.stringify({ message: "done", users }));
    } else {
      res.end(JSON.stringify({ message: "invalid id" }));
    }
  });

  req.on("error", (err) => {
    console.log("error " + err);
    res.end("error");
  });
}

function deleteUserFun(res, url) {
  let id = +url.split("/")[2];
  let status = false;
  users.forEach((el) => {
    if (el.id == id) {
      status = true;
    }
  });
  if (status) {
    users = users.filter((el) => el.id != id);
    res.end(JSON.stringify({ message: "deleted successfully", users }));
  } else {
    res.end(JSON.stringify({ message: "invalid id" }));
  }
}
