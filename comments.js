// Create Web Server
// 1. npm init
// 2. npm install express --save
// 3. npm install body-parser --save
// 4. npm install morgan --save
// 5. npm install mongoose --save
// 6. npm install nodemon --save
// 7. npm install cors --save
// 8. npm install dotenv --save
// 9. npm install cookie-parser --save
// 10. npm install express-session --save
// 11. npm install connect-mongo --save
// 12. npm install multer --save
// 13. npm install passport --save
// 14. npm install passport-local --save
// 15. npm install passport-facebook --save
// 16. npm install passport-kakao --save
// 17. npm install passport-google-oauth2 --save
// 18. npm install passport-twitter --save
// 19. npm install passport-naver --save
// 20. npm install passport-instagram --save
// 21. npm install passport-local-mongoose --save
// 22. npm install bcrypt --save
// 23. npm install express-flash --save
// 24. npm install express-session --save
// 25. npm install express-session --save
// 26. npm install express-session --save
// 27. npm install express-session --save
// 28. npm install express-session --save
// 29. npm install express-session --save
// 30. npm install express-session --save
// 31. npm install express-session --save
// 32. npm install express-session --save
// 33. npm install express-session --save
// 34. npm install express-session --save
// 35. npm install express-session --save
// 36. npm install express-session --save
// 37. npm install express-session --save
// 38. npm install express-session --save
// 39. npm install express-session --save
// 40. npm install express-session --save
// 41. npm install express-session --save
// 42. npm install express-session --save
// 43. npm install express-session --save
// 44. npm install express-session --save
// 45. npm install express-session --save
// 46. npm install

// Import module
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require("express-validator");

// Import model
const Post = require('../../models/Post');
const User = require('../../models/User');
const Comment = require('../../models/Comment');


router.get('/:post_id', async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.post_id }).populate('user', ['name', 'avatar']);
        if (!comments) {
            return res.status(404).json({ msg: 'Comment not found' });
        }
        res.json(comments);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Comment not found' });
        }
        res.status(500).send('Server Error');
    }
});