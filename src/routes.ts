import express from 'express';
import db from './database/connection';
import convertHourToMinutes from './utils/convertHourToMinutes';

const routes = express.Router();

interface scheduleItem {
    week_day: number;
    from: string;
    to: string;
}

routes.post('/classes', async (request, response) => {
    const {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost,
        schedule
    } = request.body;


    //realiza toddas a operaçõess de uma vez
    const trx = await db.transaction();
    
    try {
        //como o nome da proprieade e do valor são iguais, pode-se manter apenas a versão curta
        const insertedUsersIds = await trx('users').insert({
            name,
            avatar,
            whatsapp,
            bio
        });

        const user_id = insertedUsersIds[0];
        
        const insertedClassesIds = await trx('classes').insert({
            subject,
            cost,
            user_id
        });

        const class_id = insertedClassesIds[0];

        const classSchedule = schedule.map((schuduleItem: scheduleItem)=>{
            return {
                week_day: schuduleItem.week_day,
                from: convertHourToMinutes(schuduleItem.from),
                to: convertHourToMinutes(schuduleItem.to),
                class_id
            };
        });

        await trx('class_schedule').insert(classSchedule);
        //Apenas aqui as operaçõs são realizadas, comitadas 
        await trx.commit();

        return response.status(201).send();
    }catch (error) {
        //Caso tenha havido um erro, as alterações serão desfeitas
        await trx.rollback();
        return response.status(400).json({
            error: "Erro inesperado ao criar uma nova classe no Banco de Dados"
        })   
    }
});

export default routes;