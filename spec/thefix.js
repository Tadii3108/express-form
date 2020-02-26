const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Form</title>

    <style>
        * {
            box-sizing: border-box;
        }

        body {
            background-color: darkolivegreen;
        }

        label {
            padding: 12px 12px 12px 0;
            display: inline-block;
        }

        input [type=text], [type=number], [type=date], [type=time], [input=submit], textarea {
            width: 100%;
            padding: 12px;
            border-radius: 4px;
            resize: vertical;
            border: none;
            border-bottom: 2px solid green;
        }

        input [type=submit] {
            background-color: green;
            color: white;
            padding: 12px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            float: right;
        }

        input [type=submit]:hover {
            background-color: rgb(7, 53, 7);
        }

        .container {
            border-radius: 5px;
            padding: 20px;
            position: relative;
            margin: 5% auto;
            width: 600px;
            background: #FFF;
            border-radius: 4px;
            box-shadow: 0 12px 14px rgba(0, 0, 0, 0.6);
        }

        @media screen and (max-width: 600px) {
            .timeLabel .timeField input[type=submit] {
            width: 100%;
            margin-top: 0;
        }
        }
    </style>
</head>

<body>
    <div class="container">
    <h1>Visitor Log</h1>
    <form action="/submit" method="POST">
            <label for="name">First Name</label>
            <input type="text" name="name" required>
        
            <label for="assistant">Assistant Name</label>
            <input type="text" name="assistant" required>

            <label for="age">Your Age</label>
            <input type="number" name="age" required>

            <label for="date">Date Of Visit</label>
            <input type="date" name="date" required>

            <label for="time">Time</label>
            <input type="time" name="time" required>

        <div class="timeLabel">
            <label for="comments">Comments</label>
        </div>
        <div class="timeField">
            <textarea name="comments" placeholder="Write something" cols="30" rows="10" required></textarea>
        </div>

        <input type="submit" value="Submit">

    </form>
    </div>
    <script src="file.js"></script>
</body>
</html>`

module.exports = html;