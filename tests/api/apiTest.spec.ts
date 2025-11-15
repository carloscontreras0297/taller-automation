import { test, expect } from '@playwright/test';
import { ApiControllerApi } from "../../controllers/apiController.api";


test.describe('API TEST CASES', () => {

    test('Obtain users list @ApiTest', async ({ request }) => {
        let controller = new ApiControllerApi(request);
        const usersList = await controller.getUsersList(2);
        expect(usersList.ok, `Users list cannot be obtained`).toBeTruthy();
        expect(usersList.responseBody.data.length).toBeGreaterThan(0);
        for (const user of usersList.responseBody.data) {
            for (const [key, value] of Object.entries(user)) {
                expect(value, `Field "${key}" should not be null or undefined`).not.toBeNull();
                expect(value, `Field "${key}" should not be null or undefined`).not.toBeUndefined();
            }
        }
    });

    test('Create a user @ApiTest', async ({ request }) => {
        let controller = new ApiControllerApi(request);
        const createUser = await controller.createUser("Charlie", "QA Engineer");
        expect(createUser.responseBody.name).toBe("Charlie");
        expect(createUser.responseBody.job).toBe("QA Engineer");
    })

    test('Delete a user @ApiTest', async ({ request }) => {
        let controller = new ApiControllerApi(request);
        const newTempUser = await controller.createUser("TempUser", "ToBeDeleted");
        const deleteUserResponse = await controller.deleteUser(newTempUser.responseBody.id);
        expect(deleteUserResponse.status).toBe(204);
    })

});