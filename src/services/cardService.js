import { v4 as uuidv4 } from 'uuid';
import db from '~/models';
import { slugify } from '~/utils/formatters';

const getDetailBySlug = async (slug, archived) => {
    try {
        const data = await db.Card.findOne({
            where: { slug: slug, archived: !!archived },
            include: [
                { model: db.Column, as: 'column' },
                {
                    model: db.Checklist,
                    as: 'checklists',
                    include: [{ model: db.CheckItem, as: 'checkItems' }],
                },
            ],
        });

        return data;
    } catch (error) {
        throw error;
    }
};

const store = async (data) => {
    try {
        const [card, created] = await db.Card.findOrCreate({
            where: { ...data, uuid: uuidv4(), slug: slugify(data.title) },
        });

        // Update column
        const column = await db.Column.findOne({ where: { id: data.columnId } });
        column.update({ cardOrderIds: [...column.cardOrderIds, card.uuid] });

        if (!created) {
            return { message: 'Instance was exist!' };
        }

        return { data: card };
    } catch (error) {
        throw error;
    }
};

const update = async (cardId, data) => {
    try {
        const card = await db.Card.update(
            { ...data },
            {
                where: {
                    id: cardId,
                },
            },
        );

        return card;
    } catch (error) {
        throw error;
    }
};

const destroy = async (cardId) => {
    try {
        const card = await db.Card.destroy({
            where: {
                id: cardId,
            },
        });
        return card;
    } catch (error) {
        throw error;
    }
};

export default {
    getDetailBySlug,
    store,
    update,
    destroy,
};
