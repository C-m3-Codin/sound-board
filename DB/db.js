const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${encodeURIComponent(process.env.DB_PASS)}@cluster0.unhv19o.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function getList(guildId) {
	try {
		await client.connect();
		const database = client.db('sources');
		const collection = database.collection('guild_sources');
		const doc = await collection.findOne({ _id : guildId });
		if (!doc) return 'empty';
		const sources = {};
		Object.keys(doc).forEach(function(key) {
			if (key.includes('link')) {
				sources[key] = doc[key];
			}
		});
		return sources;
	}
	catch (error) {
		console.log(error);
		return 'error';
	}
	finally {
		await client.close();
	}
}

async function setLink(guildId, num, label, link) {
	try {
		await client.connect();
		const database = client.db('sources');
		const collection = database.collection('guild_sources');
		// create a filter for a movie to update
		const filter = { _id : guildId };
		// this option instructs the method to create a document if no documents match the filter
		const options = { upsert: true };
		// create a document that sets the plot of the movie
		const key1 = 'link' + num.toString();
		const key2 = 'label' + num.toString();
		const updateDoc = {
			$set: {
				[key1]: link,
				[key2]: label,
			},
		};
		const result = await collection.updateOne(filter, updateDoc, options);
		console.log(
			`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
		);
		return 'success';
	}
	catch (error) {
		console.log(error);
		return 'error';
	}
	finally {
		await client.close();
	}
}

module.exports = {
	getList,
	setLink,
};