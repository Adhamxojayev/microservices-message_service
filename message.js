import nodeFetch from 'node-fetch';
import { CronJob } from 'cron';

const mesageService = {
    SendMessage: (call, callback) => {
      const job = new CronJob(
        "0/5 * * * * *",
        async function () {
            await nodeFetch(
              `https://api.telegram.org/bot5746859808:AAFMerZXTlswAJ3XWhAEUzqATKUpwBhgY70/sendMessage`,{
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                  chat_id: "@task_channel_2",
                  text: `${call.request.message}  ${call.request.priority}`,
              })
            });
        },
        null,
        true,
        "Asia/Tashkent"
      );
      job.start()
      callback(null, { success: true });
    }
}

export default mesageService;