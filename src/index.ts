import type { Core } from '@strapi/strapi';
import { triggerProjectRevalidation } from "./revalidation";

const applyTo = ['api::project.project'];

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Core.Strapi }) {
    strapi.documents.use((context, next) => {
      if (!applyTo.includes(context.uid)) {
        return next();
      }

      // Only run for certain actions
      if (['create', 'update', 'delete'].includes(context.action)) {
        triggerProjectRevalidation();
      }

      return next();
    });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) { },
};
