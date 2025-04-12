import re
import socket

counts = {
    "simmons": 229,
    "random": 150,
    "maseeh": 394,
    "next": 256,
}


# our main endpoint
def get_dorm_count(dorm_name: str) -> str:
    count = counts.get(dorm_name, 0)

    body = f'{{ "count": {count} }}'
    res = (
        "HTTP/1.1 200 OK\r\n"
        "Content-Type: application/json\r\n"
        f"Content-Length: {len(body)}\r\n"
        f"Access-Control-Allow-Origin: *\r\n"
        "\r\n"
        f"{body}"
    )
    print(res)

    return res


def process_req(req: str) -> str:
    lines = req.splitlines()
    status = lines[0]
    method, url, _ = status.split()
    print(method)
    print(url)

    if method == "OPTIONS":
        return (
            "HTTP/1.1 200 OK\r\n"
            "Access-Control-Allow-Origin: http://localhost:5173\r\n"
            "Access-Control-Allow-Methods: GET, OPTIONS\r\n"
            "Access-Control-Allow-Headers: Content-Type\r\n"
            "Content-Length: 0\r\n\r\n"
        )
    if method == "GET":
        if url.startswith("/api/dormCount"):
            dorm_name = re.search(r"\?dormName=(.*)", url)
            print(dorm_name)
            if dorm_name:
                return get_dorm_count(dorm_name.groups()[0])
    return f"HTTP/1.1 400 Bad Request\r\n\r\n"


# this code is to bind our endpoint to a url,
# don't worry about implementation
# this is really bad because it's not async

host = "127.0.0.1"
port = 8000  # listening on localhost:8000
server_address = (host, port)

while True:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        s.bind(server_address)
        s.listen()
        s.setblocking(True)
        while True:
            conn, addr = s.accept()
            with conn:
                print("Connected by ", addr)
                data = conn.recv(4096)
                print(data)
                if not data:
                    print("breaking")
                    break
                else:
                    # conn.sendall(data)
                    req = data.decode("ascii")
                    print(req)
                    res = process_req(req)
                    print("right before send")
                    conn.sendall(res.encode("ascii"))
                    print("sending returned")
