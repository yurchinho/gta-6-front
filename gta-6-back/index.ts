import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import express from 'express';
const app = express();

const PORT = 5000;
const prisma = new PrismaClient();
app.use(express.json());
app.use(cors());

app.post('/api', async (req, res) => {
	const { name, email } = req.body;
	console.log(name, email);
	if (!email || !name) {
		return res.status(400).json({ message: 'Name and Email required fields' });
	}

	try {
		const createdRow = await prisma.waitList.create({
			data: {
				name,
				email,
			},
		});

		res.json(createdRow);
	} catch (error) {
		res.status(400).send(error);
	}
});

const server = app.listen(PORT, () => {
	console.log(`listening port on ${PORT}`);
});
