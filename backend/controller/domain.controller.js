import { Domain } from "../model/domain.model.js";

export const createDomain = async (req, res) => {
    const { name, extension, status, description, price, autoRenewal, renewalPrice, registrationDate, expirationDate, isFeatured, urlToBuy } = req.body;
    try {
        const domainExists = await Domain.findOne({ name });
        if (domainExists) {
            return res.status(400).json({ success: false, message: "Domain already exists" });
        }
        const domain = new Domain({
            name,
            extension,
            status,
            description,
            price,
            autoRenewal,
            renewalPrice,
            registrationDate,
            expirationDate,
            isFeatured,
            urlToBuy
        });
        await domain.save();
        res.status(201).json({
            domain: domain,
            success: true,
            message: "Domain created successfully"
        });
    } catch (error) {
        console.log("Error in createDomain", error);
        
        res.status(500).json({ success: false, message: error.message });
    }
}

export const updateDomain = async (req, res) => {
    const { name, extension, status, description, price, autoRenewal, renewalPrice, registrationDate, expirationDate, isFeatured, urlToBuy } = req.body;
    try {
        const domain = await Domain.findOne({ name });
        if (!domain) {
            return res.status(400).json({ success: false, message: "Domain not found" });
        }
        if (name && name !== domain.name) {
            const existingDomain = await Domain.findOne({ name });
            if (existingDomain) {
                return res.status(400).json({ success: false, message: "Domain name already exists" });
            }
            domain.name = name;
        }
        domain.extension = extension || domain.extension;
        domain.status = status || domain.status;
        domain.description = description || domain.description;
        domain.price = price || domain.price;
        domain.autoRenewal = autoRenewal || domain.autoRenewal;
        domain.renewalPrice = renewalPrice || domain.renewalPrice;
        domain.registrationDate = registrationDate || domain.registrationDate;
        domain.expirationDate = expirationDate || domain.expirationDate;
        domain.isFeatured = isFeatured || domain.isFeatured;
        domain.urlToBuy = urlToBuy || domain.urlToBuy;
        await domain.save();
        res.status(200).json({
            domain: domain,
            success: true,
            message: "Domain updated successfully"
        });
    } catch (error) {
        console.log("Error in updateDomain", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getDomains = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 5,
            searchName,
            extension,
            minLength,
            maxLength,
            minPrice,
            maxPrice,
            status,
            isFeatured,
        } = req.query;

        // Input validation and sanitization
        const sanitizedPage = Math.max(1, parseInt(page));
        const sanitizedLimit = Math.min(100, Math.max(1, parseInt(limit)));

        // Start building the aggregation pipeline
        let pipeline = [];

        // Stage 1: Search by name (if provided)
        if (searchName) {
            pipeline.push({
                $match: { name: { $regex: searchName, $options: 'i' } }
            });
        }

        // Stage 2: Apply other filters
        let otherFilters = {};

        if (extension) {
            otherFilters.extension = extension.toLowerCase();
        }

        if (minLength || maxLength) {
            const minLen = parseInt(minLength) || 0;
            const maxLen = parseInt(maxLength) || Number.MAX_SAFE_INTEGER;
            otherFilters.name = { $regex: new RegExp(`^.{${minLen},${maxLen}}$`) };
        }

        if (minPrice || maxPrice) {
            otherFilters.price = {};
            if (minPrice) otherFilters.price.$gte = parseFloat(minPrice);
            if (maxPrice) otherFilters.price.$lte = parseFloat(maxPrice);
        }

        if (status) {
            otherFilters.status = status.toLowerCase();
        }

        if (isFeatured !== undefined) {
            otherFilters.isFeatured = isFeatured === 'true';
        }

        if (Object.keys(otherFilters).length > 0) {
            pipeline.push({ $match: otherFilters });
        }

        // Stage 3: Pagination
        pipeline.push({ $skip: (sanitizedPage - 1) * sanitizedLimit });
        pipeline.push({ $limit: sanitizedLimit });

        // Execute the aggregation pipeline
        const domains = await Domain.aggregate(pipeline);

        // Get the total count (considering all filters)
        const totalPipeline = pipeline.slice(0, -2); // Remove skip and limit stages
        totalPipeline.push({ $count: 'total' });
        const totalResult = await Domain.aggregate(totalPipeline);
        const total = totalResult.length > 0 ? totalResult[0].total : 0;

        // Respond with paginated domains and pagination details
        res.status(200).json({
            success: true,
            total,
            page: sanitizedPage,
            limit: sanitizedLimit,
            totalPages: Math.ceil(total / sanitizedLimit),
            data: domains
        });

    } catch (error) {
        console.error("Error in getDomains:", error);
        res.status(500).json({ 
            success: false, 
            message: "An error occurred while fetching domains",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};


export const getDomainByName = async (req, res) => {
    const { name } = req.params;
    try {
        const domain = await Domain.findOne({ name });
        if (!domain) {
            return res.status(404).json({ success: false, message: "Domain not found" });
        }
        res.status(200).json({
            domain: domain,
            success: true,
            message: "Domain found"
        });
    } catch (error) {
        console.log("Error in getDomainByName", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteDomain = async (req, res) => {
    try {
        const { name } = req.params;

        const domain = await Domain.findOneAndDelete({ name });
        
        if (!domain) {
            return res.status(404).json({ success: false, message: "Domain not found" });
        }

        res.status(200).json({
            success: true,
            message: "Domain deleted successfully",
            data: domain.name
        });

    } catch (error) {
        console.log("Error in deleteDomain", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// fetch distinct extensions
export const getExtensions = async (req, res) => {
    try {
        const extensions = await Domain.distinct('extension');
        res.status(200).json({
            success: true,
            data: extensions
        });
    } catch (error) {
        console.log("Error in getExtensions", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
