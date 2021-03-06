// export mongo into file so we can get the database
const postsCollection = require('../db').db().collection('posts')

// This is setting up ObjectID's with MongoDB, so we can attach user id's with posts.
const ObjectID = require('mongodb').ObjectID


let Post = function(data, userid) {
    this.data = data
    this.errors= []
    this.useris = userid
}

Post.prototype.cleanUp = function () {
    if(typeof(this.data.title) != 'string') {this.data.title = ''}
    if (typeof (this.data.body) != 'string') { this.data.body = '' }

    // get rid of any bogus properties
    this.data = {
        title: this.data.title.trim(),
        body: this.data.body.trim(),
        createdDate: new Date(),
        author: ObjectID(this.userid)
    }
}

// make sure the title and body are not blank
Post.prototype.validate = function () {
    if (this.data.title == '') {this.errors.push('You must provide a title.')}
    if (this.data.body == '') { this.errors.push('You must provide post content.') }
}

Post.prototype.create = function() {
    return new Promise((resolve, reject) => {
        this.cleanUp()
        this.validate()
        if (!this.errors.length) {
            // save post into database if no errors
            postsCollection.insertOne(this.data).then(() => {
                resolve()
            }).catch(() => {
                this.errors.push("Please try again later")
                reject(this.errors)
            })
            
        } else {
            // reject post if errors
            reject(this.errors)
        }
    })
}

Post.findSingleById = function(id) {
    return new Promise(async function(resolve, reject) {
        if (typeof(id) !="string" || !ObjectID.isValid(id)) {
            reject();
            return
        }
        let post = await postsCollection.findOne({_id: new ObjectID(id)})
        if (post) {
            resolve(post);
        } else {
            reject();
        }
    })
}

module.exports = Post