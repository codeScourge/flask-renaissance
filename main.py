from flask import Flask, render_template_string
import execjs

app = Flask(
    __name__,
    static_folder="./dist"
)

print(f"\nRunning JavaScript on {execjs.get().name}\n")

def renderServerComponent(path:str):
    with open(path, 'r') as file:
        js_code = file.read()
        ctx = execjs.compile(js_code)
        try:
            return ctx.call("renderToString")
        except execjs.ProgramError as e:
            print(f"JavaScript error: {str(e)}")
            return str(e)


@app.route("/")
def firstRoute():
    react_html = renderServerComponent("./dist/server/main.js")
    template = '''
    <!DOCTYPE html>
    <html>
    <head>
        <title>React SSR with Flask</title>
    </head>
    <body>
        <div id="root">{{ react_html|safe }}</div>
        <script src="{{ url_for('static', filename='client/main.js') }}"></script>
    </body>
    </html>
    '''
    return render_template_string(template, react_html=react_html)


if __name__ == "__main__":
    app.run(debug=True)