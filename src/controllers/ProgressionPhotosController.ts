import { Request, Response } from 'express';

async function checkPhoto(req: Request, res: Response): Promise<void> {
    const { photo } = req.body;
    console.log(photo);
}

export { checkPhoto };
