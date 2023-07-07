import { createMocks, MockResponse, MockRequest } from "node-mocks-http"
import productHandler from "../../../pages/api/products"
import prisma from "libs/prisma"

jest.mock("../../../libs/prisma", () => ({
  product: {
    findMany: jest.fn(),
    create: jest.fn(),
  },
}))

describe("Product API", () => {
  it("limits the number of requests within a specified time frame", async () => {
    const requestCount = 5 // Number of requests to simulate
    const timeFrame = 1000 // Time frame in milliseconds
    const interval = Math.floor(timeFrame / requestCount)

    // Create a mock response object
    const mockResponse: MockResponse<any> = {
      statusCode: 200,
      _getJSONData: jest.fn(),
      _getStatusCode: jest.fn(),
      _isEndCalled: false,
      _getHeaders: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    // Create a mock request with the GET method
    const getMockRequest = (): MockRequest<any> =>
      createMocks({
        method: "GET",
      }).req as MockRequest<any>

    // Simulate multiple requests within the time frame
    for (let i = 0; i < requestCount; i++) {
      const req = getMockRequest()

      // Call the API handler function
      await productHandler(req, mockResponse)

      // Verify the response status and body for each request
      expect(mockResponse.status).toHaveBeenCalledWith(200)
      expect(mockResponse.json).toHaveBeenCalled()

      // Delay execution for the next request
      await new Promise((resolve) => setTimeout(resolve, interval))
    }

    // Create an additional request outside the time frame
    const req = getMockRequest()
    await productHandler(req, mockResponse)

    // Verify that the additional request receives a 429 response
    expect(mockResponse.status).toHaveBeenCalledWith(429)
    expect(mockResponse.json).toHaveBeenCalledWith({ error: "Too many requests" })
  })
})
