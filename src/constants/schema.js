const TABLE_QUICK_CONFIG = {
  Branch: {
    enableModalEdit: true,
    columns:
      "name:Name,sort,search|isActive:Is Active,sort,search|address:Address,sort,search",
    form: {
      groups: [
        {
          name: "main",
          lines: [
            "thumbnail:thumbnail",
            "name:Name|address.city|isActive:Is Active",
            "address.street:Street|address.ward:Ward|address.district:District",
          ],
        },
      ],
    },
  },
};

export const SCHEMAS = {
  tables: [
    {
      className: "_User",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        username: { type: "String" },
        password: { type: "String" },
        email: { type: "String" },
        emailVerified: { type: "Boolean" },
        authData: { type: "Object" },
        phone: { type: "String" },
        lastName: { type: "String" },
        firstName: { type: "String" },
        status: { type: "String" },
        verifiedCode: { type: "Number", required: false },
        otpCode: { type: "Number" },
        otp: { type: "Number", required: false },
        isActive: { type: "Boolean" },
        fullName: { type: "String", required: false },
        gender: { type: "String", required: false },
        dob: { type: "Date", required: false },
        branch: { type: "Pointer", targetClass: "Branch", required: false },
        series: { type: "String", required: false },
        roles: { type: "Relation", targetClass: "_Role", required: false },
        isRequiredResetPassword: { type: "Boolean", required: false },
        identityNumber: { type: "String", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: {
        _id_: { _id: 1 },
        case_insensitive_username: { username: 1 },
        email_1: { email: 1 },
        case_insensitive_email: { email: 1 },
        username_1: { username: 1 },
      },
    },
    {
      className: "_Role",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String" },
        users: { type: "Relation", targetClass: "_User" },
        roles: { type: "Relation", targetClass: "_Role" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 }, name_1: { name: 1 } },
    },
    {
      className: "Employee",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        salary: { type: "Object" },
        educationalQualifications: { type: "Array" },
        gender: { type: "String" },
        dob: { type: "String" },
        designation: { type: "String" },
        employeeId: { type: "String" },
        status: { type: "String" },
        doj: { type: "String" },
        employmentType: { type: "String" },
        company: { type: "Pointer", targetClass: "Company", required: false },
        user: { type: "Pointer", targetClass: "_User", required: false },
        series: { type: "String", required: false },
        fullName: { type: "String", required: false },
        contracts: { type: "Array", required: false },
        phone: { type: "String", required: false },
        email: { type: "String", required: false },
        isActive: { type: "Boolean", required: false },
        street: { type: "String", required: false },
        ward: { type: "String", required: false },
        district: { type: "String", required: false },
        address: { type: "String", required: false },
        department: { type: "Pointer", targetClass: "SysCfg", required: false },
        branch: { type: "Pointer", targetClass: "Branch", required: false },
        password: { type: "String" },
        province: { type: "String", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: {
        _id_: { _id: 1 },
        firstName_text: { firstName: "text" },
        series_regex: { series: 1 },
        fullname_idx: { fullName: 1 },
        series_idx: { series: 1 },
      },
    },
    {
      className: "_Session",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        user: { type: "Pointer", targetClass: "_User" },
        installationId: { type: "String" },
        sessionToken: { type: "String" },
        expiresAt: { type: "Date" },
        createdWith: { type: "Object" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Department",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String" },
        createdBy: { type: "Pointer", targetClass: "_User", required: false },
        company: { type: "Pointer", targetClass: "Company", required: false },
        status: { type: "String", required: false, defaultValue: "Enabled" },
        department: { type: "String", required: false },
        parentDepartment: { type: "String", required: false },
        isGroup: { type: "Boolean", required: false },
        disabled: { type: "Boolean" },
        payrollCostCenter: { type: "String" },
        leaveApprover: { type: "Array" },
        expenseApprover: { type: "Array" },
        shiftRequestApprover: { type: "Array" },
        costCenter: { type: "Pointer", targetClass: "CostCenter" },
        leaveBlockList: {
          type: "Pointer",
          targetClass: "LeaveBlockList",
          required: false,
        },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "SysCfg",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        Name: { type: "String", required: false },
        Code: { type: "String", required: false },
        Company: { type: "Pointer", targetClass: "Company", required: false },
        Values: { type: "Array", required: false },
        Category: { type: "String", required: false },
        value: { type: "String", required: false },
        configuration: { type: "Object", required: false },
        active: { type: "Boolean", required: false },
        valueObj: { type: "Object", required: false },
        isActive: { type: "Boolean", required: false },
        thumbnail: { type: "File", required: false },
        en_name: { type: "String" },
        vn_name: { type: "String" },
        bankId: { type: "String" },
        atmBin: { type: "String" },
        cardLength: { type: "Number" },
        bankCode: { type: "String" },
        type: { type: "String" },
        napasSupported: { type: "Boolean" },
        serriesCode: { type: "String", required: false },
        valueTo: { type: "Number", required: false },
        valueFrom: { type: "Number", required: false },
        numberOfTransaction: { type: "Number", required: false },
        numberValue: { type: "Number", required: false },
        name: { type: "String", required: false },
        code: { type: "String", required: false },
        minValue: { type: "Number", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Company",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: false },
        address: { type: "Object", required: false, defaultValue: {} },
        logo: { type: "File", required: false },
        domainName: { type: "Array", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Attendance",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        status: { type: "String", required: false },
        employee: { type: "Pointer", targetClass: "Employee", required: false },
        date: { type: "Date", required: false },
        company: { type: "Pointer", targetClass: "Company", required: false },
        earlyExit: { type: "Boolean", required: false },
        lateEntry: { type: "Boolean", required: false },
        series: { type: "String" },
        shift: { type: "Pointer", targetClass: "ShiftType" },
        requests: { type: "Array" },
        leaveType: { type: "Pointer", targetClass: "LeaveType" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Shift",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
    },
    {
      className: "LeaveApplication",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        series: { type: "String", required: false },
        leaveType: {
          type: "Pointer",
          targetClass: "LeaveType",
          required: false,
        },
        employee: { type: "Pointer", targetClass: "Employee", required: false },
        fromDate: { type: "String", required: false },
        toDate: { type: "String", required: false },
        halfDay: { type: "Boolean", required: false },
        reason: { type: "String", required: false },
        leaveApprover: { type: "String", required: false },
        status: { type: "String", required: false },
        salarySlip: {
          type: "Pointer",
          targetClass: "SalarySlip",
          required: false,
        },
        postingDate: { type: "String", required: false },
        company: { type: "Pointer", targetClass: "Company", required: false },
        letterHead: { type: "String", required: false },
        followViaEmail: { type: "Boolean" },
        totalLeaveDays: { type: "Number" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Branch",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        isActive: { type: "Boolean", required: false, defaultValue: true },
        name: { type: "String", required: true },
        thumbnail: { type: "File", required: false },
        company: { type: "Pointer", targetClass: "Company", required: false },
        companyName: { type: "String", required: false },
        ward: { type: "String", required: false },
        district: { type: "String", required: false },
        province: { type: "String", required: false },
        code: { type: "String", required: false },
        address: { type: "Object", required: false },
        wareHouse: {
          type: "Pointer",
          targetClass: "WareHouse",
          required: false,
        },
        accountNumber: { type: "String", required: false },
        bank: { type: "Pointer", targetClass: "SysCfg", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "EmployeeGroup",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: false },
        employee: { type: "Array", required: false },
        query: { type: "String" },
        emmployee: { type: "Array" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Customer",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        fullName: { type: "String", required: false },
        status: { type: "String", required: false, defaultValue: "Enabled" },
        customerId: { type: "String", required: false },
        accounts: { type: "Array" },
        user: { type: "Pointer", targetClass: "_User", required: false },
        gender: { type: "String", required: false },
        inviteCode: { type: "String", required: false },
        origin: { type: "String", required: false },
        campaign: { type: "String", required: false },
        code: { type: "String" },
        email: { type: "String", required: false },
        address: { type: "String", required: false },
        avatar: { type: "File" },
        province: { type: "String" },
        district: { type: "String" },
        ward: { type: "String" },
        invitedBy: {
          type: "Pointer",
          targetClass: "Customer",
          required: false,
        },
        supporter: {
          type: "Pointer",
          targetClass: "Employee",
          required: false,
        },
        birthday: { type: "Date" },
        country: { type: "String" },
        addressLine1: { type: "String" },
        verify: { type: "String" },
        CCCDNumber: { type: "String", required: false },
        CCCDIssueDate: { type: "Date", required: false },
        CCCDIssuePlace: { type: "String", required: false },
        CCCDFront: { type: "File", required: false },
        CCCDBack: { type: "File", required: false },
        identityDate: { type: "Object" },
        isActive: { type: "Boolean", required: false },
        isVerified: { type: "Boolean", required: false },
        phone: { type: "String" },
        salesStaff: {
          type: "Pointer",
          targetClass: "Employee",
          required: false,
        },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": ["address"], "role:Test": [] },
      },
      indexes: { _id_: { _id: 1 }, fullName_text: { fullName: "text" } },
    },
    {
      className: "SalaryComponent",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: false },
        abbr: { type: "String", required: false },
        description: { type: "String", required: false },
        status: { type: "Boolean", required: false },
        rthni: { type: "Boolean" },
        disable: { type: "Boolean" },
        amount: { type: "String", required: false, defaultValue: "0" },
        condition: { type: "String" },
        type: { type: "String", required: false },
        dependsOnPaymentDays: { type: "Boolean" },
        isTaxApplicable: { type: "Boolean" },
        roundTo: { type: "Boolean" },
        statisticalComponent: { type: "Boolean" },
        notIncludeInTotal: { type: "Boolean" },
        disabled: { type: "Boolean" },
        isFlexibleBenefit: { type: "Boolean" },
        amountBasedOnFormula: { type: "Boolean" },
        dataTableAccount: { type: "Array" },
        deductFullTax: { type: "Boolean" },
        isIncomeTaxComponent: { type: "Boolean", required: false },
        variableBasedOnTaxableSalary: { type: "Boolean", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Contact",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: false },
        emailAddress: { type: "String", required: false },
        companyName: {
          type: "Pointer",
          targetClass: "Company",
          required: false,
        },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Opportunity",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        title: { type: "String", required: false },
        status: { type: "String" },
        series: { type: "String" },
        opportunityFrom: { type: "String" },
        party: { type: "String" },
        source: { type: "String" },
        opportunityType: { type: "String" },
        convertedBy: { type: "String" },
        salesStage: { type: "String" },
        expectedClosingDate: { type: "String" },
        currency: { type: "String" },
        opportunityAmount: { type: "String" },
        probability: { type: "String" },
        customer: { type: "String" },
        lead: { type: "String" },
        name: { type: "String" },
        id: { type: "Number" },
        company: { type: "String" },
        opportunityDate: { type: "String" },
        printLanguage: { type: "String" },
        nextContactBy: { type: "String" },
        nextContactDate: { type: "String" },
        toDiscuss: { type: "String" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "SalaryStructure",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: false },
        letterHead: { type: "String", required: false },
        payrollFrequency: { type: "String", required: false },
        currency: { type: "String", required: false },
        modeOfPayment: { type: "String", required: false },
        paymentAccount: { type: "String", required: false },
        leaveEncashmentAmountPerDay: { type: "String", required: false },
        maxBenefits: { type: "String", required: false },
        modeOfmPayment: { type: "String" },
        isActive: { type: "String" },
        company: { type: "Pointer", targetClass: "Company" },
        dataTableEarning: { type: "Array" },
        dataTableDeductions: { type: "Array" },
        isAcitve: { type: "String" },
        basedOnTimesheet: { type: "Boolean" },
        hourRate: { type: "String" },
        salaryComponent: { type: "Pointer", targetClass: "SalaryComponent" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Appointment",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        phoneNumber: { type: "String", required: false },
        skypeID: { type: "String", required: false },
        details: { type: "String", required: false },
        appointmentWith: { type: "String", required: false },
        party: { type: "String", required: false },
        calendarEvent: { type: "String", required: false },
        phoneNo: { type: "String" },
        id: { type: "Number" },
        paymentMethod: { type: "String" },
        delivery: { type: "Object" },
        name: { type: "String", required: false },
        email: { type: "String", required: false },
        note: { type: "String" },
        status: { type: "String", required: false },
        order: { type: "Pointer", targetClass: "Order" },
        scheduledTime: { type: "Date", required: false },
        customer: { type: "Pointer", targetClass: "Customer", required: false },
        quanlityOfGoldForSale: { type: "String" },
        goldType: { type: "String" },
        type: { type: "String" },
        sheduledTime: { type: "String" },
      },
      classLevelPermissions: {
        find: { "role:Staff": true, requiresAuthentication: true },
        count: { "*": true, requiresAuthentication: true },
        get: { "role:Staff": true, requiresAuthentication: true },
        create: { "role:Staff": true, requiresAuthentication: true },
        update: { "role:Staff": true, requiresAuthentication: true },
        delete: { "role:Staff": true, requiresAuthentication: true },
        addField: { "*": true, requiresAuthentication: true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Lead",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: false },
        status: { type: "String", required: false },
        gender: { type: "String", required: false },
        email: { type: "String", required: true },
        phone: { type: "String", required: false },
        dob: { type: "Date", required: false },
        province: { type: "String", required: false },
        district: { type: "String", required: false },
        ward: { type: "String", required: false },
        identity: { type: "String", required: false },
        identityDate: { type: "Date", required: false },
        invitedBy: {
          type: "Pointer",
          targetClass: "Customer",
          required: false,
        },
        identityPlace: { type: "String", required: false },
        approachFrom: { type: "String", required: false },
        address: { type: "String", required: false },
        salesStaff: {
          type: "Pointer",
          targetClass: "Employee",
          required: false,
        },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Account",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: false },
        type: { type: "String", required: false },
        company: { type: "Pointer", targetClass: "Company", required: false },
        balance: { type: "Number", required: false, defaultValue: 0 },
        bank: { type: "Pointer", targetClass: "SysCfg", required: false },
        linkedWith: {
          type: "Pointer",
          targetClass: "Account",
          required: false,
        },
        interCompanyAccount: { type: "Boolean" },
        currency: { type: "String" },
        rate: { type: "String" },
        Balance: { type: "String" },
        isGroup: { type: "Boolean", required: false, defaultValue: false },
        rootType: { type: "String", required: false },
        customer: { type: "Pointer", targetClass: "Customer", required: false },
        nodeChild: { type: "Array", required: false },
        nodeParent: { type: "Array", required: false },
        parentAccount: { type: "Pointer", targetClass: "Account" },
        code: { type: "String", required: false },
        attribute: { type: "Object", required: false },
        accountNumber: { type: "String", required: false },
        useMasterKey: { type: "Boolean" },
        isActive: { type: "Boolean" },
        branch: { type: "Pointer", targetClass: "Branch", required: false },
      },
      classLevelPermissions: {
        find: { requiresAuthentication: true, "role:Sale": true },
        count: { "*": true, requiresAuthentication: true },
        get: { "role:Sale": true },
        create: { "role:Sale": true },
        update: { "role:Sale": true },
        delete: { "role:Sale": true },
        addField: { "*": true, requiresAuthentication: true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "PayrollEntry",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        postingDate: { type: "String" },
        currency: { type: "String" },
        payrollFrequency: { type: "String" },
        payrollPayableAccount: { type: "String" },
        company: { type: "Pointer", targetClass: "Company" },
        startDate: { type: "String" },
        endDate: { type: "String" },
        costCenter: { type: "String" },
        department: { type: "Pointer", targetClass: "DepartmentSelected" },
        designation: { type: "String" },
        project: { type: "String" },
        grievanceType: { type: "String" },
        bankAccount: { type: "String" },
        branch: { type: "Pointer", targetClass: "Branch" },
        employee: { type: "Pointer", targetClass: "Employee" },
        Branch: { type: "String" },
        name: { type: "String" },
        validateAttendance: { type: "Boolean" },
        salarySlipBasedOnTimesheet: { type: "Boolean" },
        deductTaxForUnclaimed: { type: "Boolean" },
        deductTaxForUnsubmittedTax: { type: "Boolean" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "CostCenter",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: false },
        costCenterName: { type: "String", required: false },
        isGroup: { type: "Boolean", required: false },
        disabled: { type: "Boolean", required: false },
        parentCostCenter: { type: "String", required: false },
        company: { type: "Pointer", targetClass: "Company", required: false },
        distributedCostCenter: { type: "Array", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "SalaryStructureAssignment",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        variable: { type: "Number" },
        base: { type: "Number" },
        fromDate: { type: "String" },
        salaryStructure: { type: "Pointer", targetClass: "SalaryStructure" },
        employee: { type: "Pointer", targetClass: "Employee" },
        name: { type: "String" },
        incomeTaxSlab: {
          type: "Pointer",
          targetClass: "IncomeTaxSlab",
          required: false,
        },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "CustomerGroup",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        customerGroupName: { type: "String", required: true },
        name: { type: "String", required: false },
        parentCustomerGroup: { type: "String", required: false },
        isGroup: { type: "Boolean", required: false },
        defaultPaymentTermsTemplate: { type: "String" },
        defaultPriceList: { type: "String" },
        id: { type: "Number" },
        type: { type: "String" },
        customerGroup: { type: "Pointer", targetClass: "CustomerGroup" },
        territory: { type: "Pointer", targetClass: "Territory" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Territory",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        territoryName: { type: "String", required: false },
        parentTerritory: { type: "String", required: false },
        isGroup: { type: "Boolean", required: false },
        name: { type: "String", required: false },
        territoryManager: { type: "String", required: false },
        id: { type: "Number" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "SalesPerson",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        employee: { type: "Pointer", targetClass: "Employee", required: false },
        name: { type: "String", required: false },
        salesPersonName: { type: "String", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "JobOpening",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        jobTitle: { type: "String", required: false },
        designation: { type: "String", required: false },
        company: { type: "Pointer", targetClass: "Company", required: false },
        status: { type: "String", required: false },
        publishOnWebsite: { type: "Boolean", required: false },
        description: { type: "String", required: false },
        currency: { type: "String", required: false },
        publishSalaryRange: { type: "Boolean", required: false },
        upperRange: { type: "Number", required: false },
        lowerRange: { type: "Number", required: false },
        department: { type: "String" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "SalarySlip",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        employee: { type: "Pointer", targetClass: "Employee" },
        postingDate: { type: "String" },
        salarySlipBasedOnTimesheet: { type: "Boolean" },
        deductTaxForUnclaimed: { type: "Boolean" },
        deductTaxForUnsubmittedTax: { type: "Boolean" },
        letterHead: { type: "String" },
        startDate: { type: "String" },
        endDate: { type: "String" },
        payrollFrequency: { type: "String" },
        name: { type: "String" },
        dataTableDeductions: { type: "Array" },
        dataTableEarning: { type: "Array" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "EmployeeOtherIncome",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        company: { type: "Pointer", targetClass: "Company" },
        employee: { type: "Pointer", targetClass: "Employee" },
        payrollPeriod: { type: "Pointer", targetClass: "PayrollPeriod" },
        name: { type: "String", required: false },
        source: { type: "String" },
        amount: { type: "Number", required: true },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "AdditionalSalary",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        series: { type: "String", required: false },
        isRecurring: { type: "Boolean", required: false, defaultValue: false },
        payrollDate: { type: "String", required: false },
        fromDate: { type: "String", required: false },
        toDate: { type: "String", required: false },
        deductFullTax: {
          type: "Boolean",
          required: false,
          defaultValue: false,
        },
        overwriteSalaryStructureAmount: {
          type: "Boolean",
          required: false,
          defaultValue: false,
        },
        code: { type: "Number" },
        error: { type: "String" },
        Currency: { type: "String", required: false, defaultValue: "VND" },
        amount: { type: "Number", required: false },
        currency: { type: "String" },
        employee: { type: "Pointer", targetClass: "Employee", required: true },
        salaryComponent: {
          type: "Pointer",
          targetClass: "SalaryComponent",
          required: true,
        },
        company: { type: "Pointer", targetClass: "Company", required: true },
        incentiveAmount: { type: "Number" },
      },
      classLevelPermissions: {
        find: { "role:Staff": true },
        count: { "*": true },
        get: { "role:Staff": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "JobApplicantSource",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: false },
        description: { type: "String", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "EmployeeSkillMap",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        employee: { type: "Pointer", targetClass: "Employee", required: false },
        employeeName: { type: "String", required: false },
        designation: { type: "String", required: false },
        skills: { type: "Array", required: false },
        trainings: { type: "Array", required: false },
        employeeSkills: { type: "Array" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "JobApplicant",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String" },
        email: { type: "String" },
        phone: { type: "String" },
        country: { type: "String" },
        status: { type: "String" },
        coverLetter: { type: "String" },
        resumeLink: { type: "String" },
        currency: { type: "String" },
        lowerRange: { type: "String" },
        upperRange: { type: "String" },
        rate: { type: "Number" },
        jobOpening: {
          type: "Pointer",
          targetClass: "JobOpening",
          required: false,
        },
        source: {
          type: "Pointer",
          targetClass: "JobApplicantSource",
          required: false,
        },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "EmployeePromotion",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        employee: { type: "Pointer", targetClass: "Employee", required: false },
        company: { type: "Pointer", targetClass: "Company", required: false },
        promotionDate: { type: "String", required: false },
        employeePromotionDetail: { type: "Array", required: false },
        status: { type: "String", required: false, defaultValue: "draft" },
        employeePromotionDetails: { type: "Array" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "PayrollPeriod",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        payrollPeriodName: { type: "String" },
        company: { type: "String" },
        startDate: { type: "String" },
        endDate: { type: "String" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "TermAndCondition",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        title: { type: "String", required: false },
        disabled: { type: "Boolean", required: false },
        isSelling: { type: "Boolean", required: false },
        isBuying: { type: "Boolean", required: false },
        isHR: { type: "Boolean", required: false },
        description: { type: "String", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "IncomeTaxSlab",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: true },
        effectiveFrom: { type: "String", required: true },
        currency: { type: "String", required: true },
        taxExemptionAmount: { type: "String", required: false },
        allowTaxExemption: {
          type: "Boolean",
          required: false,
          defaultValue: false,
        },
        disabled: { type: "Boolean", required: false, defaultValue: false },
        taxableSalarySlabs: { type: "Array", required: true },
        taxesAndChargesOnIncomeTax: { type: "Array", required: false },
        company: { type: "Pointer", targetClass: "Company", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "EmployeeTaxExemptionCategory",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        maxExemptionAmount: { type: "Number" },
        name: { type: "String" },
        active: { type: "Boolean" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "EmployeeTaxExemptionSubCategory",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        taxExemptionCategory: {
          type: "Pointer",
          targetClass: "EmployeeTaxExemptionCategory",
        },
        maxExemptionAmount: { type: "Number" },
        name: { type: "String" },
        active: { type: "Boolean" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "EmployeeTaxExemptionDeclaration",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        employee: { type: "Pointer", targetClass: "Employee", required: true },
        payrollPeriod: {
          type: "Pointer",
          targetClass: "PayrollPeriod",
          required: true,
        },
        company: { type: "Pointer", targetClass: "Company", required: false },
        currency: { type: "String", required: true },
        name: { type: "String", required: true },
        declarations: { type: "Array", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "JobOffer",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        series: { type: "String", required: false },
        jobApplicant: { type: "Pointer", targetClass: "JobApplicant" },
        status: { type: "String" },
        offerDate: { type: "String" },
        designation: { type: "String" },
        company: { type: "Pointer", targetClass: "Company" },
        termAndCondition: { type: "Pointer", targetClass: "TermAndCondition" },
        letterHead: { type: "String" },
        printHeading: { type: "String" },
        jobOfferTerm: { type: "Array" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "EmployeeTaxExemptionProofSubmission",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        employee: { type: "Pointer", targetClass: "Employee", required: true },
        submissionDate: { type: "String", required: true, defaultValue: "" },
        payrollPeriod: {
          type: "Pointer",
          targetClass: "PayrollPeriod",
          required: true,
        },
        company: { type: "Pointer", targetClass: "Company", required: true },
        taxExemptionProofs: { type: "Array", required: false },
        currency: { type: "String" },
        name: { type: "String", required: true },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "EmployeeGrade",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: false },
        salaryStructure: {
          type: "Pointer",
          targetClass: "SalaryStructure",
          required: false,
        },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "LeaveBlockList",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        leaveBlockListName: { type: "String", required: false },
        company: { type: "Pointer", targetClass: "Company", required: false },
        leaveBlockListDates: { type: "Array", required: false },
        leaveBlockListAllowed: { type: "Array", required: false },
        appliesToCompany: { type: "Boolean", required: false },
        name: { type: "String", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "RetentionBonus",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        company: { type: "Pointer", targetClass: "Company" },
        employee: { type: "Pointer", targetClass: "Employee" },
        bonusPaymentDate: { type: "String" },
        bonusAmount: { type: "String" },
        salaryComponent: { type: "Pointer", targetClass: "SalaryComponent" },
        name: { type: "String", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "EmployeeOnboardingTemplate",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        company: { type: "Pointer", targetClass: "Company", required: false },
        designation: { type: "String", required: false },
        department: { type: "String", required: false },
        activities: { type: "Array", required: false },
        employeeGrade: {
          type: "Pointer",
          targetClass: "EmployeeGrade",
          required: false,
        },
        series: { type: "String", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "LeaveType",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        leaveTypeName: { type: "String", required: false },
        name: { type: "String", required: false },
        maxLeavesAllowed: { type: "String", required: false },
        applicableAfter: { type: "String", required: false },
        maximumContinuousDaysApplicable: { type: "String", required: false },
        isCarryForward: { type: "Boolean", required: false },
        isLeaveWithoutPay: { type: "Boolean", required: false },
        isPartiallyPaidLeave: { type: "Boolean", required: false },
        isOptionalLeave: { type: "Boolean", required: false },
        allowNegativeBalance: { type: "Boolean", required: false },
        includeHolidaysWithinLeavesAsLeaves: {
          type: "Boolean",
          required: false,
        },
        isCompensatory: { type: "Boolean", required: false },
        earningComponent: {
          type: "Pointer",
          targetClass: "SalaryComponent",
          required: false,
        },
        earnedLeaveFrequency: { type: "String", required: false },
        rounding: { type: "String", required: false },
        encashmentThresholdDays: { type: "String", required: false },
        fractionOfDailySalaryPerLeave: { type: "String" },
        maximumCarryForwardedLeaves: { type: "String" },
        expireCarryForwardedLeaves: { type: "String" },
        basedOnDateOfJoining: { type: "Boolean" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "EmployeeIncentive",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        employee: { type: "Pointer", targetClass: "Employee", required: true },
        company: { type: "Pointer", targetClass: "Company", required: true },
        salaryComponent: {
          type: "Pointer",
          targetClass: "SalaryComponent",
          required: true,
        },
        payrollDate: { type: "String", required: true },
        name: { type: "String", required: true },
        incentiveAmount: { type: "Number" },
        date: { type: "String" },
        payrollPeriod: { type: "String" },
        benefits: { type: "Array" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "LeavePeriod",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: false },
        fromDate: { type: "String", required: false },
        toDate: { type: "String", required: false },
        company: { type: "Pointer", targetClass: "Company", required: false },
        holiday: { type: "String", required: false },
        isActive: { type: "Boolean" },
        holidayList: { type: "String" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "EmployeeBenefitClaim",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        employee: { type: "Pointer", targetClass: "Employee" },
        claimDate: { type: "String" },
        company: { type: "Pointer", targetClass: "Company" },
        claimBenefitFor: { type: "String" },
        claimedAmount: { type: "String" },
        name: { type: "String" },
        attachments: { type: "Array", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "EmployeeBenefitApplication",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        employee: { type: "Pointer", targetClass: "Employee", required: true },
        date: { type: "String", required: true },
        payrollPeriod: {
          type: "Pointer",
          targetClass: "PayrollPeriod",
          required: true,
        },
        company: { type: "Pointer", targetClass: "Company", required: true },
        benefits: { type: "Array", required: false },
        name: { type: "String", required: true },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "EmployeeOnboarding",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        jobApplicant: {
          type: "Pointer",
          targetClass: "JobApplicant",
          required: false,
        },
        jobOffer: { type: "Pointer", targetClass: "JobOffer", required: false },
        employeeName: { type: "String", required: false },
        dateOfJoining: { type: "Date", required: false },
        status: { type: "String", required: false },
        employeeOnboardingTemplate: {
          type: "Pointer",
          targetClass: "EmployeeOnboardingTemplate",
        },
        company: { type: "Pointer", targetClass: "Company" },
        department: { type: "String" },
        designation: { type: "String" },
        employeeGrade: { type: "Pointer", targetClass: "EmployeeGrade" },
        series: { type: "String", required: false },
        activities: { type: "Array", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "GrievanceType",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: false },
        description: { type: "String", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "DepartmentSelected",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "LeavePolicy",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        leaveAllocations: { type: "Array", required: false },
        name: { type: "String", required: false },
        status: { type: "String", required: false, defaultValue: "draft" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "LeavePolicyAssignment",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        employee: { type: "Pointer", targetClass: "Employee", required: false },
        leavePeriod: {
          type: "Pointer",
          targetClass: "LeavePeriod",
          required: false,
        },
        effectiveFrom: { type: "String", required: false },
        effectiveTo: { type: "String", required: false },
        leavePolicy: {
          type: "Pointer",
          targetClass: "LeavePolicy",
          required: false,
        },
        addUnusedLeaves: { type: "Boolean", required: false },
        status: { type: "String", required: false, defaultValue: "draft" },
        name: { type: "String", required: false },
        company: {
          type: "Pointer",
          targetClass: "Company",
          required: false,
          defaultValue: {
            __type: "Pointer",
            className: "Company",
            objectId: "i0JPXsRGQH",
          },
        },
        assignmentBasedOn: { type: "String" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "ShiftAssignment",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        shiftType: { type: "Pointer", targetClass: "ShiftType" },
        employee: { type: "Pointer", targetClass: "Employee" },
        status: { type: "String" },
        company: { type: "Pointer", targetClass: "Company" },
        startDate: { type: "String" },
        endDate: { type: "String" },
        name: { type: "String" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "LeaveAllocation",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        series: { type: "String", required: false },
        status: { type: "String", required: false, defaultValue: "draft" },
        employee: { type: "Pointer", targetClass: "Employee", required: false },
        leaveType: {
          type: "Pointer",
          targetClass: "LeaveType",
          required: false,
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
          required: false,
          defaultValue: {
            __type: "Pointer",
            className: "Company",
            objectId: "i0JPXsRGQH",
          },
        },
        fromDate: { type: "String", required: false },
        toDate: { type: "String", required: false },
        newLeavesAllocated: { type: "String", required: false },
        addUnusedLeaves: { type: "Boolean", required: false },
        leavePolicyAssignment: {
          type: "Pointer",
          targetClass: "LeavePolicyAssignment",
          required: false,
        },
        description: { type: "String", required: false },
        totalLeavesAllocated: { type: "Number" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "EmployeeSeparationTemplate",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        company: { type: "Pointer", targetClass: "Company" },
        designation: { type: "String" },
        department: { type: "String" },
        employeeGrade: { type: "Pointer", targetClass: "EmployeeGrade" },
        series: { type: "String" },
        activities: { type: "Array" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "LeaveEncashment",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        leavePeriod: {
          type: "Pointer",
          targetClass: "LeavePeriod",
          required: false,
        },
        employee: { type: "Pointer", targetClass: "Employee", required: false },
        company: { type: "Pointer", targetClass: "Company", required: false },
        leaveType: {
          type: "Pointer",
          targetClass: "LeaveType",
          required: false,
        },
        encashmentDate: { type: "String", required: false },
        currency: { type: "String", required: false },
        status: { type: "String", required: false, defaultValue: "draft" },
        name: { type: "String", required: false },
        objectClassName: {
          type: "String",
          required: false,
          defaultValue: "LeaveEncashment",
        },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "CompensatoryLeaveRequest",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: false, defaultValue: "" },
        employee: { type: "Pointer", targetClass: "Employee", required: false },
        leaveType: {
          type: "Pointer",
          targetClass: "LeaveType",
          required: false,
        },
        reason: { type: "String", required: false },
        workFromDate: { type: "String", required: false },
        workEndDate: { type: "String", required: false },
        halfDay: { type: "Boolean", required: false },
        halfDayDate: { type: "String", required: false },
        status: { type: "String", required: false, defaultValue: "draft" },
        isHalfDay: { type: "Boolean" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "EmployeeSeparation",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        firstName: { type: "String" },
        designation: { type: "String" },
        department: { type: "String" },
        employee: { type: "Pointer", targetClass: "Employee" },
        company: { type: "Pointer", targetClass: "Company" },
        status: { type: "String" },
        employeeSeparationTemplate: {
          type: "Pointer",
          targetClass: "EmployeeSeparationTemplate",
        },
        series: { type: "String" },
        exitInterviewSummary: { type: "String" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "ShiftRequest",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        shiftType: { type: "Pointer", targetClass: "ShiftType" },
        employee: { type: "Pointer", targetClass: "Employee" },
        status: { type: "String" },
        company: { type: "Pointer", targetClass: "Company" },
        name: { type: "String" },
        fromDate: { type: "String" },
        toDate: { type: "String" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "EmployeeCheckin",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        employee: { type: "Pointer", targetClass: "Employee", required: false },
        time: { type: "String", required: false },
        name: { type: "String", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
    },
    {
      className: "EmployeeGrievance",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        subject: { type: "String" },
        raisedBy: { type: "Pointer", targetClass: "Employee" },
        date: { type: "Date" },
        status: { type: "String" },
        grievanceAgainstParty: { type: "String" },
        grievanceAgainst: { type: "String" },
        grievanceType: { type: "String" },
        associatedDocumentType: { type: "String" },
        associatedDocument: { type: "String" },
        description: { type: "String" },
        causeOfGrievance: { type: "String" },
        resolvedBy: { type: "String" },
        employeeResponsible: { type: "Pointer", targetClass: "Employee" },
        resolutionDetails: { type: "String" },
        series: { type: "String" },
        resolutionDate: { type: "String" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "ProjectType",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String" },
        description: { type: "String" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "EmployeeTransfer",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        employeeName: { type: "String" },
        department: { type: "String" },
        newEmployeeId: { type: "Boolean" },
        employee: { type: "Pointer", targetClass: "Employee" },
        transferDate: { type: "Date" },
        company: { type: "Pointer", targetClass: "Company" },
        newCompany: { type: "String" },
        series: { type: "String" },
        status: { type: "String", required: false, defaultValue: "Submitted" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "User",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        fullName: { type: "String", required: false },
        status: { type: "String", required: false, defaultValue: "Active" },
        name: { type: "String", required: false },
        email: { type: "String", required: false },
        firstName: { type: "String", required: false },
        lastName: { type: "String", required: false },
        sendWelcomeEmail: { type: "Boolean", required: false },
        timeZone: { type: "String" },
        middleName: { type: "String" },
        username: { type: "String" },
        language: { type: "String" },
        userType: {
          type: "String",
          required: false,
          defaultValue: "System User",
        },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Project",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: false },
        estimatedCost: { type: "Number" },
        customer: { type: "Pointer", targetClass: "Customer" },
        company: { type: "Pointer", targetClass: "Company" },
        projectType: { type: "Pointer", targetClass: "ProjectType" },
        projectName: { type: "String" },
        isCollectProgress: { type: "Boolean" },
        status: { type: "String" },
        fromTemplate: { type: "String" },
        expectedStartDate: { type: "String" },
        expectedEndDate: { type: "String" },
        priority: { type: "String" },
        department: { type: "String" },
        description: { type: "String" },
        completeMethod: { type: "String" },
        members: { type: "Array" },
        salesOrder: { type: "Pointer", targetClass: "Order" },
        isActive: { type: "Boolean" },
        holidayList: { type: "String" },
        frequencyToCollectProgress: { type: "String" },
        firstEmail: { type: "String" },
        secondEmail: { type: "String" },
        massage: { type: "String" },
        fromTime: { type: "String" },
        toTime: { type: "String" },
        timetoSendDaily: { type: "String" },
        daytoSend: { type: "String" },
        timetoSendWeekly: { type: "String" },
        costCenterList: { type: "Pointer", targetClass: "CostCenter" },
        defaultCostCenter: { type: "Pointer", targetClass: "CostCenter" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "AttendanceRequest",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        employee: { type: "Pointer", targetClass: "Employee", required: false },
        company: { type: "Pointer", targetClass: "Company", required: false },
        series: { type: "String", required: false },
        explanation: { type: "String", required: false },
        fromDate: { type: "Date", required: false },
        halfDayDate: { type: "Date", required: false },
        reason: { type: "String", required: false },
        toDate: { type: "Date" },
        halfDay: { type: "Boolean" },
        status: { type: "String", required: false, defaultValue: "Submitted" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "ExpenseClaim",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        status: { type: "String", required: false, defaultValue: "Draft" },
        employee: { type: "Pointer", targetClass: "Employee", required: false },
        company: { type: "Pointer", targetClass: "Company", required: false },
        grievanceType: {
          type: "Pointer",
          targetClass: "GrievanceType",
          required: false,
        },
        costCenter: {
          type: "Pointer",
          targetClass: "CostCenter",
          required: false,
        },
        series: { type: "String", required: false },
        isPaid: { type: "Boolean" },
        expenseApprover: { type: "String" },
        approvalStatus: { type: "String" },
        postingDate: { type: "String" },
        task: { type: "String" },
        remark: { type: "String" },
        clearanceDate: { type: "String" },
        account: { type: "String" },
        project: { type: "String" },
        expenses: { type: "Array" },
        expensesTaxes: { type: "Array" },
        advances: { type: "Array" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Task",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        subject: { type: "String", required: true },
        color: { type: "String", required: false },
        priority: { type: "String", required: true },
        weight: { type: "Number", required: false },
        parentTask: { type: "Pointer", targetClass: "Task", required: false },
        description: { type: "String", required: false },
        name: { type: "String", required: true },
        expectedStartDate: { type: "String", required: false },
        expectedEndDate: { type: "String", required: false },
        expectedTime: { type: "Number", required: false },
        progress: { type: "Number", required: false },
        beginOn: { type: "Number", required: false },
        duration: { type: "Number", required: false },
        completedOn: { type: "String", required: false },
        company: { type: "Pointer", targetClass: "Company", required: false },
        department: {
          type: "Pointer",
          targetClass: "Department",
          required: false,
        },
        isGroup: { type: "Boolean" },
        isTemplate: { type: "Boolean" },
        project: { type: "Pointer", targetClass: "Project", required: false },
        isMilestone: { type: "Boolean" },
        issue: { type: "Pointer", targetClass: "Issue", required: false },
        completedBy: { type: "Pointer", targetClass: "_User", required: false },
        status: { type: "String", required: false },
        dependencies: { type: "Array", required: false },
        order: { type: "Number", required: false },
        type: { type: "Pointer", targetClass: "TaskType", required: false },
        assigner: { type: "Pointer", targetClass: "_User", required: false },
        assignees: { type: "Array", required: false },
        attachments: { type: "Array", required: false },
        tags: { type: "Array" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "EmployeeAdvance",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        series: { type: "String", required: false },
        postingDate: { type: "String", required: false },
        isRepay: { type: "Boolean", required: false },
        employee: { type: "Pointer", targetClass: "Employee", required: false },
        currency: { type: "String", required: false },
        purpose: { type: "String", required: false },
        advanceAmount: { type: "String", required: false },
        company: { type: "Pointer", targetClass: "Company", required: false },
        paymentMode: { type: "String", required: false },
        advanceAccount: { type: "String", required: false },
        status: { type: "String", required: false, defaultValue: "Draft" },
        objectClassName: {
          type: "String",
          required: false,
          defaultValue: "EmployeeAdvance",
        },
        account: { type: "String" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "ShiftType",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String" },
        startTime: { type: "String" },
        endTime: { type: "String" },
        holiday: { type: "String" },
        determineCheckinandCheckout: { type: "String" },
        workingHoursThresholdForHalfDay: { type: "String" },
        workingHoursCalculationBasedOn: { type: "String" },
        workingHoursThresholdforAbsent: { type: "String" },
        beginCheckinBeforeShiftStartTime: { type: "String" },
        allowCheckOutAfterShiftEndTime: { type: "String" },
        earlyExitGracePeriod: { type: "String" },
        lateEntryGracePeriod: { type: "String" },
        enableAutoAttendance: { type: "Boolean" },
        enableEntry: { type: "Boolean" },
        enableExit: { type: "Boolean" },
        processAttendanceAfter: { type: "String" },
        lastSyncOfCheckin: { type: "String" },
        workingDays: { type: "Array" },
        breakTimes: { type: "Array" },
        dataItem: { type: "Object" },
        dataId: { type: "String" },
        holidayList: { type: "Pointer", targetClass: "HolidayList" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "TravelRequest",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: false },
        status: { type: "String", required: false, defaultValue: "Draft" },
        travelType: { type: "String", required: false },
        travelPurpose: { type: "String", required: false },
        employee: { type: "Pointer", targetClass: "Employee", required: false },
        travelFunding: { type: "String", required: false },
        sponsorDetails: { type: "String", required: false },
        identificationDocumentType: { type: "String", required: false },
        identificationDocumentNumber: { type: "String", required: false },
        passportNumber: { type: "String", required: false },
        contactNumber: { type: "String", required: false },
        contactEmail: { type: "String", required: false },
        travelItinerary: { type: "Array", required: false },
        costingDetails: { type: "Array", required: false },
        costCenter: {
          type: "Pointer",
          targetClass: "CostCenter",
          required: false,
        },
        grievanceType: {
          type: "Pointer",
          targetClass: "GrievanceType",
          required: false,
        },
        description: { type: "String", required: false },
        organizerName: { type: "String", required: false },
        organizerAddress: { type: "String", required: false },
        otherDetails: { type: "String", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Product",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: false },
        buyingPrice: { type: "Number", required: false },
        sellingPrice: { type: "Number", required: false },
        description: { type: "String", required: false },
        status: { type: "String", required: false, defaultValue: "Available" },
        branch: { type: "Pointer", targetClass: "Branch" },
        count: { type: "Number", required: false },
        brand: { type: "Pointer", targetClass: "Brand", required: false },
        category: { type: "Pointer", targetClass: "Category", required: false },
        productId: { type: "String", required: false },
        image: { type: "File", required: false },
        isAllowedSaving: {
          type: "Boolean",
          required: true,
          defaultValue: true,
        },
        warrantyPolicy: { type: "String", required: false },
        attributes: { type: "Array", required: false },
        warranty: { type: "String", required: false },
        paymentDelivery: { type: "String", required: false },
        goldWeight: { type: "Number", required: false },
        goldType: { type: "String", required: false },
        isActive: { type: "Boolean", required: false },
        uom: { type: "String", required: false },
        appName: { type: "String", required: false },
        isVoucher: { type: "Boolean", required: false },
        barcode: { type: "String", required: false },
        serviceFee: { type: "Number", required: false },
        vendor: { type: "Pointer", targetClass: "Vendor", required: false },
        maxPromotion: { type: "Pointer", targetClass: "Promotion" },
        color: { type: "String", required: false },
        size: { type: "String", required: false },
        promotionPrice: { type: "Number" },
        profit: { type: "Number", required: false },
        otherFee: { type: "Number", required: false },
        stoneWeight: { type: "Number", required: false },
        totalWeight: { type: "Number", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: {
        _id_: { _id: 1 },
        name_txt: { name: 1 },
        name_text: { name: "text" },
      },
    },
    {
      className: "TrainingProgram",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        trainingProgram: { type: "String", required: false },
        status: { type: "String", required: false },
        trainerName: { type: "String", required: false },
        trainerEmail: { type: "String", required: false },
        supplier: { type: "String", required: false },
        contactNumber: { type: "String", required: false },
        description: { type: "String", required: false },
        trainingprogram: { type: "String" },
        trainingName: { type: "String" },
        company: { type: "Pointer", targetClass: "Company", required: false },
        notes: { type: "String" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Order",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        total: { type: "Number", required: false },
        paymentMethod: { type: "String", required: false },
        customer: { type: "Pointer", targetClass: "Customer", required: false },
        status: { type: "String", required: false, defaultValue: "Pending" },
        receivingType: { type: "String" },
        note: { type: "String" },
        orderItems: { type: "Array" },
        shippingFee: { type: "Number", required: false },
        code: { type: "String", required: false },
        delivery: { type: "Object", required: false },
        originalTotal: { type: "Number" },
        vouchers: { type: "Array" },
        voucherDiscount: { type: "Number" },
        promotionDiscount: { type: "Number" },
        subtotal: { type: "Number" },
        isActive: { type: "Boolean", required: false },
        shippingDate: { type: "Date", required: false },
        receivingDate: { type: "Date", required: false },
        receivedMoney: { type: "Number", required: false },
        codMethod: { type: "String", required: false },
        accountNumber: { type: "String", required: false },
        refundedMoney: { type: "Number", required: false },
        branchName: { type: "String", required: false },
        cashier: { type: "Pointer", targetClass: "Employee", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "OrderItem",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        product: { type: "Pointer", targetClass: "Product", required: false },
        order: { type: "Pointer", targetClass: "Order", required: false },
        total: { type: "Number", required: false },
        quantity: { type: "Number", required: false },
        name: { type: "String", required: false, defaultValue: "" },
        note: { type: "String" },
        price: { type: "Number" },
        promotionPrice: { type: "Number" },
        promotionDiscount: { type: "Number" },
        productId: { type: "String" },
        customer: { type: "Pointer", targetClass: "Customer" },
        tax: { type: "Number" },
        promotion: {
          type: "Pointer",
          targetClass: "Promotion",
          required: false,
        },
        sellingPrice: { type: "Number" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Transaction",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        order: { type: "Pointer", targetClass: "Order", required: false },
        source: { type: "Pointer", targetClass: "Account", required: false },
        target: { type: "Pointer", targetClass: "Account", required: false },
        type: { type: "String", required: false },
        amount: { type: "Number", required: false },
        balance: { type: "Number", required: false },
        status: { type: "String" },
        memo: { type: "String" },
        code: { type: "String", required: true },
        cashier: { type: "Pointer", targetClass: "Employee", required: false },
      },
      classLevelPermissions: {
        find: { "*": true, requiresAuthentication: true },
        count: { "*": true, requiresAuthentication: true },
        get: { "*": true, requiresAuthentication: true },
        create: { "*": true, requiresAuthentication: true },
        update: { "*": true, requiresAuthentication: true },
        delete: { "*": true, requiresAuthentication: true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "MyClass",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String" },
        age: { type: "Number" },
        date: { type: "String" },
        myField: { type: "String" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Issue",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        subject: { type: "String", required: false },
        status: { type: "String", required: false },
        priority: { type: "String", required: false },
        name: { type: "String", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "TrainingEvent",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        eventName: { type: "String", required: false },
        type: { type: "String", required: false },
        level: { type: "String", required: false },
        trainerName: { type: "String", required: false },
        trainerEmail: { type: "String", required: false },
        contactNumber: { type: "String", required: false },
        course: { type: "String", required: false },
        location: { type: "String", required: false },
        introduction: { type: "String", required: false },
        startTime: { type: "String", required: false },
        endTime: { type: "String", required: false },
        code: { type: "Number" },
        error: { type: "String" },
        eventStatus: { type: "String" },
        attendees: { type: "Array" },
        status: { type: "String", required: false, defaultValue: "Draft" },
        company: { type: "Pointer", targetClass: "Company", required: false },
        trainingProgram: {
          type: "Pointer",
          targetClass: "TrainingProgram",
          required: false,
        },
        supplier: { type: "Pointer", targetClass: "Supplier", required: false },
        name: { type: "String", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Item",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: false },
        itemCode: { type: "String", required: false },
        defaultUnitOfMeasure: { type: "String" },
        isItemFromHub: { type: "Boolean" },
        disabled: { type: "Boolean" },
        allowAlternativeItem: { type: "Boolean" },
        maintainStock: { type: "Boolean" },
        includeItemInManufacturing: { type: "Boolean" },
        isFixedAsset: { type: "Boolean" },
        autoCreateAssetsOnPurchase: { type: "Boolean" },
        isItemfromHub: { type: "Boolean" },
        itemName: { type: "String" },
        openingStock: { type: "String" },
        valuationRate: { type: "String" },
        standardSellingRate: { type: "String" },
        itemGroup: { type: "Pointer", targetClass: "ItemGroup" },
        assetCategory: { type: "Pointer", targetClass: "AssetCategory" },
        assetNamingSeries: { type: "String" },
        brand: { type: "Pointer", targetClass: "Brand", required: false },
        description: { type: "String" },
        barcodes: { type: "Array" },
        shelfLifeInDays: { type: "String" },
        endOfLife: { type: "String" },
        defaultMaterialRequestType: { type: "String" },
        valuationMethod: { type: "String" },
        warrantyPeriod: { type: "String" },
        weightPerUnit: { type: "String" },
        weightUOM: { type: "String" },
        itemAttribute: { type: "Array", required: false },
        hasVariants: { type: "Boolean" },
        itemCompany: { type: "Array" },
        isActive: { type: "Boolean", required: false },
        image: { type: "File", required: false },
        price: { type: "Number", required: false },
        username: { type: "String" },
        password: { type: "String" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "ItemAlternative",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        itemCode: { type: "String" },
        alternativeItemCode: { type: "String" },
        itemName: { type: "String" },
        alternativeItemName: { type: "String" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "CustomsTariffNumber",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        tariffNumber: { type: "String" },
        description: { type: "String" },
        addAComment: { type: "String" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "ItemGroup",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: false },
        username: { type: "String" },
        password: { type: "String" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "AssetCategory",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Notification",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        title: { type: "String", required: false },
        sentNotifications: { type: "Number", required: false },
        notificationReadingRate: { type: "Number", required: false },
        sentTime: { type: "String", required: false },
        receiveUsers: { type: "Array", required: false, defaultValue: [] },
        content: { type: "String" },
        shortTitle: { type: "String" },
        status: { type: "String", required: false, defaultValue: "sent" },
        isActive: { type: "Boolean", required: false },
        customer: { type: "Pointer", targetClass: "Customer", required: false },
        type: { type: "String", required: false },
        receivingCustomers: { type: "Array", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Discount",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        series: { type: "String" },
        itemCode: { type: "Pointer", targetClass: "Item" },
        itemGroup: { type: "String" },
        disable: { type: "Boolean" },
        mixedCondition: { type: "Boolean" },
        isCumulative: { type: "Boolean" },
        selling: { type: "Boolean" },
        buying: { type: "Boolean" },
        name: { type: "String" },
        applyOn: { type: "String" },
        applyRuleOnOther: { type: "String" },
        validFrom: { type: "String" },
        validUpto: { type: "String" },
        company: { type: "Pointer", targetClass: "Company" },
        currency: { type: "String" },
        applicableFor: { type: "String" },
        image: { type: "String" },
        priceDiscountSlabs: { type: "Array" },
        productDiscountSlabs: { type: "Array" },
        pricingRule: { type: "Array" },
        applicableForSelected: { type: "String" },
        brand: { type: "Pointer", targetClass: "Brand" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "MaterialRequest",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        series: { type: "String", required: false },
        isCollectProgress: { type: "Boolean" },
        transactionDate: { type: "String" },
        purpose: { type: "String" },
        requiredBy: { type: "String" },
        company: { type: "Pointer", targetClass: "Company" },
        targetWarehouse: { type: "String" },
        scanBarcode: { type: "String" },
        description: { type: "String" },
        letterHead: { type: "String" },
        printHeading: { type: "String" },
        terms: { type: "String" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "ItemManufacturer",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        iconCode: { type: "String" },
        manufacturer: { type: "String" },
        manufacturerPartNumber: { type: "String" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Voucher",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        displayApp: { type: "String" },
        subjectOfApplication: { type: "String" },
        type: { type: "String" },
        name: { type: "String" },
        description: { type: "String" },
        series: { type: "String" },
        budget: { type: "Number", required: false, defaultValue: 1000000 },
        percent: { type: "Number", required: false, defaultValue: 10 },
        priceAbove: { type: "Number", required: false },
        fixed: { type: "Number", required: false },
        maxRedemption: { type: "Number", required: false },
        ortherPromotions: {
          type: "Boolean",
          required: false,
          defaultValue: true,
        },
        isStackable: { type: "Boolean", required: false, defaultValue: true },
        products: { type: "Array", required: false },
        branch: { type: "Pointer", targetClass: "Branch" },
        maxRedemptionPerCustomer: { type: "Number", required: false },
        maxDiscount: { type: "Number", required: false },
        stackable: { type: "Boolean" },
        ortherPromotion: { type: "Boolean" },
        applyOn: { type: "String" },
        policy: { type: "Array", required: false },
        startDate: { type: "Date", required: false },
        endDate: { type: "Date", required: false },
        campaign: { type: "Pointer", targetClass: "Campaign", required: false },
        code: { type: "String", required: false },
        content: { type: "String", required: false },
        cost: { type: "Number", required: false },
        image: { type: "File", required: false },
        customer: { type: "Pointer", targetClass: "Customer", required: false },
        amount: { type: "Number" },
        refProduct: {
          type: "Pointer",
          targetClass: "Product",
          required: false,
        },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Brand",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: false },
        thumbnail: { type: "File", required: false },
        isActive: { type: "Boolean", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "TaskType",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: true },
        weight: { type: "Number", required: false },
        description: { type: "String", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "WareHouse",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        city: { type: "String" },
        name: { type: "String" },
        branch: { type: "Pointer", targetClass: "Branch", required: false },
        code: { type: "String", required: false },
        isBranchDefault: { type: "Boolean", required: false },
        address: { type: "String", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "File",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        fileName: { type: "String", required: false },
        createdBy: { type: "Pointer", targetClass: "_User", required: false },
        fileSize: { type: "Number", required: false },
        isFolder: { type: "Boolean", required: false },
        parent: { type: "Pointer", targetClass: "File", required: false },
        fileType: { type: "String", required: false },
        originalImageUrl: { type: "String" },
        thumbnailImageUrl: { type: "String" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "SerialNo",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        company: { type: "String" },
        serialNo: { type: "String" },
        itemCode: { type: "String" },
        salesOrder: { type: "String" },
        supplier: { type: "String" },
        customer: { type: "String" },
        warrantyExpiryDate: { type: "String" },
        amcExpiryDate: { type: "String" },
        workOrder: { type: "String" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Batch",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        batchUom: { type: "String" },
        batchId: { type: "String" },
        item: { type: "String" },
        manufacturingDate: { type: "String" },
        expiryDate: { type: "String" },
        batchDescription: { type: "String" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Quotation",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: false },
        status: { type: "String", required: false, defaultValue: "Draft" },
        date: { type: "String", required: false },
        grandTotal: { type: "Number", required: false },
        customer: { type: "Pointer", targetClass: "Customer", required: false },
        company: { type: "Pointer", targetClass: "Company", required: false },
        validTill: { type: "String" },
        orderType: { type: "String" },
        applyAdditionalDiscountOn: { type: "String" },
        groupSameItems: { type: "Boolean" },
        ignorePricingRule: { type: "Boolean" },
        quotationTo: { type: "String" },
        taxCategory: { type: "String" },
        shippingRule: { type: "String" },
        salesTaxesAndChargesTemplate: { type: "String" },
        paymentTermsTemplate: { type: "String" },
        currency: { type: "String" },
        priceList: { type: "String" },
        items: { type: "Array" },
        paymentSchedule: { type: "Array" },
        salesTaxesAndCharges: { type: "Array" },
        lead: { type: "Pointer", targetClass: "Lead" },
        couponCode: { type: "String" },
        referralSalesPartner: { type: "String" },
        additionalDiscountPercentage: { type: "String" },
        additionalDiscountAmount: { type: "String" },
        termDetails: { type: "String" },
        terms: { type: "Pointer", targetClass: "TermAndCondition" },
        letterHead: { type: "String" },
        printHeading: { type: "String" },
        campaign: { type: "String" },
        leadSource: { type: "String" },
        supplierQuotation: { type: "String" },
        title: { type: "String", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "InstallationNote",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        status: { type: "String" },
        installationDate: { type: "String" },
        installationTime: { type: "String" },
        company: { type: "String" },
        customer: { type: "String" },
        remarks: { type: "String" },
        series: { type: "String" },
        batchUom: { type: "String" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "ItemAttribute",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        numericValues: { type: "Boolean" },
        attributeName: { type: "String" },
        fromRange: { type: "String" },
        increment: { type: "String" },
        toRange: { type: "String" },
        name: { type: "String" },
        error: { type: "String" },
        code: { type: "Number" },
        itemAttributeValues: { type: "Array" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "HrSetting",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        stopBirthdayReminders: { type: "Boolean" },
        expenseApproverMandatory: { type: "Boolean" },
        retirementAge: { type: "String" },
        createdBy: { type: "String" },
        standardWorkingHours: { type: "String" },
        leaveApprovalNotificationTemplate: {
          type: "Pointer",
          targetClass: "EmailTemplate",
        },
        leaveStatusNotificationTemplate: {
          type: "Pointer",
          targetClass: "EmailTemplate",
        },
        userName: { type: "String" },
        sendLeaveNotification: { type: "Boolean" },
        leaveApproverMandatory: { type: "Boolean" },
        showLeaves: { type: "Boolean" },
        autoLeaveEncashment: { type: "Boolean" },
        restrictBackdatedLeaveApplication: { type: "Boolean" },
        roleAllowedtoCreateBackdatedLeaveApplication: { type: "String" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "EmailTemplate",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: false },
        subject: { type: "String", required: false },
        response: { type: "String", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "PriceList",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        enabled: { type: "Boolean" },
        buying: { type: "Boolean" },
        selling: { type: "Boolean" },
        priceNotUOMDependent: { type: "Boolean" },
        priceListName: { type: "String" },
        currency: { type: "String" },
        itemCountry: { type: "Array" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "SalesOrder",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        customer: { type: "Pointer", targetClass: "Customer", required: false },
        company: { type: "Pointer", targetClass: "Company", required: false },
        date: { type: "String", required: false },
        deliveryDate: { type: "String", required: false },
        orderType: { type: "String", required: false },
        name: { type: "String", required: false },
        grandTotal: { type: "Number", required: false },
        territory: { type: "Pointer", targetClass: "Territory" },
        currency: { type: "String" },
        applyAdditionalDiscountOn: { type: "String" },
        groupSameItems: { type: "Boolean" },
        isInternalCustomer: { type: "Boolean" },
        ignorePricingRule: { type: "Boolean" },
        customerPurchaseOrder: { type: "String" },
        taxCategory: { type: "String" },
        shippingRule: { type: "String" },
        salesTaxesAndChargesTemplate: { type: "String" },
        paymentTermsTemplate: { type: "String" },
        items: { type: "Array" },
        salesTaxesAndCharges: { type: "Array" },
        paymentSchedule: { type: "Array" },
        salesTeam: { type: "Array" },
        status: { type: "String", required: false, defaultValue: "Draft" },
        customerAddress: { type: "Pointer", targetClass: "Address" },
        contactPerson: { type: "Pointer", targetClass: "Contact" },
        companyAddressName: { type: "Pointer", targetClass: "Address" },
        shippingAddressName: { type: "Pointer", targetClass: "Address" },
        couponCode: { type: "String" },
        additionalDiscountPercentage: { type: "String" },
        additionalDiscountAmount: { type: "String" },
        terms: { type: "String" },
        project: { type: "String" },
        source: { type: "String" },
        campaign: { type: "String" },
        letterHead: { type: "String" },
        printHeading: { type: "String" },
        salesPartner: { type: "String" },
        commissionRate: { type: "String" },
        totalCommission: { type: "String" },
        fromDate: { type: "String" },
        toDate: { type: "String" },
        autoRepeat: { type: "String" },
        termDetails: { type: "String" },
        priceList: {
          type: "Pointer",
          targetClass: "PriceList",
          required: false,
        },
        sourceWarehouse: { type: "Pointer", targetClass: "WareHouse" },
      },
      classLevelPermissions: {
        find: { "role:Test": true, requiresAuthentication: true, "*": true },
        count: { "role:Test": true, requiresAuthentication: true, "*": true },
        get: { "role:Test": true, requiresAuthentication: true, "*": true },
        create: { "role:Test": true },
        update: { "role:Test": true },
        delete: { "role:Test": true },
        addField: { "role:Test": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Timesheet",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        exchangeRate: { type: "Number" },
        employee: { type: "Pointer", targetClass: "Employee" },
        project: { type: "Pointer", targetClass: "Project" },
        customer: { type: "Pointer", targetClass: "Customer" },
        company: { type: "Pointer", targetClass: "Company" },
        assetNamingSeries: { type: "String" },
        currency: { type: "String" },
        status: { type: "String" },
        description: { type: "String" },
        timeSheets: { type: "Array" },
        series: { type: "String" },
        totalBillableHour: { type: "String" },
        totalBillableAmount: { type: "String" },
        totalCostingAmount: { type: "String" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Redemption",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        customer: { type: "Pointer", targetClass: "Customer" },
        order: { type: "Pointer", targetClass: "Order" },
        voucher: { type: "Pointer", targetClass: "Voucher" },
        voucherDiscount: { type: "Number" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Address",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: false },
        status: { type: "String", required: false, defaultValue: "Enabled" },
        addressType: { type: "String", required: false },
        cityTown: { type: "String", required: false },
        addressTitle: { type: "String", required: false },
        addressLine1: { type: "String", required: false },
        addressLine2: { type: "String", required: false },
        county: { type: "String", required: false },
        stateProvince: { type: "String", required: false },
        country: { type: "String", required: false },
        postalCode: { type: "String", required: false },
        emailAddress: { type: "String", required: false },
        phone: { type: "String", required: false },
        fax: { type: "String", required: false },
        taxCategory: { type: "String", required: false },
        preferredBillingAddress: { type: "Boolean", required: false },
        disabled: { type: "Boolean", required: false },
        preferredShippingAddress: { type: "Boolean", required: false },
        links: { type: "Array", required: false },
        preferredShppingAddress: { type: "Boolean" },
        isYourCompanyAddress: { type: "Boolean" },
        ward: { type: "String", required: false },
        street: { type: "String", required: false },
        distric: { type: "String", required: false },
      },
      classLevelPermissions: {
        find: { "role:Admin": true },
        count: { "role:Admin": true },
        get: { "role:Admin": true },
        create: { "role:Admin": true },
        update: { "role:Admin": true },
        delete: { "role:Admin": true },
        addField: { "role:Admin": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "ActivityType",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        defaultBillingRate: { type: "Number" },
        defaultCostingRate: { type: "Number" },
        name: { type: "String" },
        disabled: { type: "Boolean" },
      },
      classLevelPermissions: {
        find: {},
        count: { "*": true },
        get: {},
        create: {},
        update: {},
        delete: {},
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "ActivityCost",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        employee: { type: "Pointer", targetClass: "Employee" },
        costingRate: { type: "Number" },
        billingRate: { type: "Number" },
        activityType: { type: "Pointer", targetClass: "ActivityType" },
        name: { type: "String" },
        title: { type: "String" },
      },
      classLevelPermissions: {
        find: {},
        count: { "*": true },
        get: {},
        create: {},
        update: {},
        delete: {},
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "TaxWithholdingCategory",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: false },
        categoryName: { type: "String", required: false },
        rates: { type: "Array", required: false },
        accounts: { type: "Array", required: false },
        objectClassName: {
          type: "String",
          required: false,
          defaultValue: "TaxWithholdingCategory",
        },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Contract",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        order: { type: "Pointer", targetClass: "Order", required: false },
        code: { type: "String", required: true },
        isActive: { type: "Boolean", required: false },
        paidAmount: { type: "Number", required: false },
        noPeriods: { type: "Number", required: false },
        noPaidPeriods: { type: "Number", required: false },
        customer: { type: "Pointer", targetClass: "Customer", required: false },
        periodPaidAmount: { type: "Number", required: false },
        status: { type: "String" },
        noUnpaidPeriods: { type: "Number" },
        total: { type: "Number", required: false },
        rate: { type: "Number", required: false },
        interestRateRef: {
          type: "Pointer",
          targetClass: "InterestRate",
          required: false,
        },
        startDate: { type: "Date", required: false },
        endDate: { type: "Date", required: false },
        signature: { type: "File" },
        currentInterest: { type: "Number", required: false },
        estimateInterest: { type: "Number", required: false },
        penalty: { type: "Number" },
        currentPeriod: { type: "Number" },
        type: { type: "String" },
        periodicInterest: { type: "Number" },
        periodic: { type: "Number" },
        contractFile: { type: "File" },
        savingAccount: { type: "Pointer", targetClass: "Account" },
        interestAccount: { type: "Pointer", targetClass: "Account" },
        isAllowedEarlySettle: {
          type: "Boolean",
          required: false,
          defaultValue: false,
        },
        isAllowEarlySettle: { type: "Boolean" },
      },
      classLevelPermissions: {
        find: { requiresAuthentication: true, "*": true },
        count: { "*": true, requiresAuthentication: true },
        get: { requiresAuthentication: true, "*": true },
        create: { requiresAuthentication: true, "*": true },
        update: { requiresAuthentication: true, "*": true },
        delete: { requiresAuthentication: true, "*": true },
        addField: { "*": true, requiresAuthentication: true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Post",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        title: { type: "String", required: false },
        content: { type: "String", required: false },
        status: { type: "String", required: false },
        thumbnail: { type: "File", required: false },
        countView: { type: "String", required: false },
        series: { type: "String", required: false },
        createdBy: { type: "Pointer", targetClass: "_User", required: false },
        tags: { type: "Array", required: false },
        name: { type: "String" },
        isFeatured: { type: "Boolean", required: false },
        sendPushNotification: { type: "Boolean" },
        shortTitle: { type: "String" },
        link: { type: "String" },
        category: { type: "Pointer", targetClass: "SysCfg", required: false },
        isHighlight: { type: "Boolean", required: false },
      },
      classLevelPermissions: {
        find: { "role:Admin": true },
        count: { "role:Admin": true },
        get: { "role:Admin": true },
        create: { "role:Admin": true },
        update: { "role:Admin": true },
        delete: { "role:Admin": true },
        addField: { "role:Admin": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "ShoppingCart",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        items: { type: "Array", required: false },
        total: { type: "Number", required: false },
        originalTotal: { type: "Number", required: false },
        customer: { type: "Pointer", targetClass: "Customer", required: false },
        voucherDiscount: { type: "Number" },
        promotionDiscount: { type: "Number" },
        vouchers: { type: "Array" },
        quantity: { type: "Number" },
        subtotal: { type: "Number" },
        note: { type: "String" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Appraisal",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        series: { type: "String" },
        appraisalTemplate: {
          type: "Pointer",
          targetClass: "AppraisalTemplate",
        },
        status: { type: "String" },
        startDate: { type: "String" },
        endDate: { type: "String" },
        company: { type: "Pointer", targetClass: "Company" },
        employee: { type: "Pointer", targetClass: "Employee" },
        remarks: { type: "String" },
        goals: { type: "Array" },
        referenceDocumentType: { type: "String" },
        ruleName: { type: "String" },
        points: { type: "Number" },
        enabled: { type: "Boolean" },
        allotPointsToAssignedUsers: { type: "Boolean" },
        applyOnlyOnce: { type: "Boolean" },
        forDocumentEvent: { type: "String" },
        userField: { type: "String" },
        multiplierField: { type: "String" },
        condition: { type: "String" },
      },
      classLevelPermissions: {
        find: {},
        count: { "*": true },
        get: {},
        create: {},
        update: {},
        delete: {},
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "AppraisalTemplate",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: false },
        description: { type: "String" },
        goals: { type: "Array" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Tag",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: false },
        tagId: { type: "String", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "DailyWorkSummaryGroup",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        enable: { type: "Boolean" },
        name: { type: "String" },
        sendEmailsAt: { type: "String" },
        holidayList: { type: "String" },
        subject: { type: "String" },
        series: { type: "String" },
        content: { type: "String" },
        users: { type: "Array" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "EnergyPointRule",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        referenceDocumentType: { type: "String" },
        ruleName: { type: "String" },
        points: { type: "Number" },
        enabled: { type: "Boolean" },
        allotPointsToAssignedUsers: { type: "Boolean" },
        applyOnlyOnce: { type: "Boolean" },
        forDocumentEvent: { type: "String" },
        userField: { type: "String" },
        multiplierField: { type: "String" },
        condition: { type: "String" },
        name: { type: "String" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "EnergyPointLog",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
    },
    {
      className: "LoanType",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        isTermLoan: { type: "Boolean" },
        disabled: { type: "Boolean" },
        loanName: { type: "String" },
        loanAmount: { type: "String" },
        rateOfInterest: { type: "String" },
        penaltyInterestRate: { type: "String" },
        gracePeriodinDays: { type: "String" },
        autoWriteOffAmount: { type: "String" },
        company: { type: "Pointer", targetClass: "Company" },
        description: { type: "String" },
        modeOfPayment: { type: "String" },
        paymentAccount: { type: "Pointer", targetClass: "Account" },
        loanAccount: { type: "Pointer", targetClass: "Account" },
        interestIncomeAccount: { type: "Pointer", targetClass: "Account" },
        penaltyIncomeAccount: { type: "Pointer", targetClass: "Account" },
        series: { type: "String" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "HolidayList",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: false },
        fromDate: { type: "String", required: false },
        toDate: { type: "String", required: false },
        totalHolidays: { type: "Number", required: false },
        holidays: { type: "Array", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "SupplierGroup",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        isGroup: { type: "Boolean" },
        name: { type: "String" },
        defaultPaymentTermsTemplate: { type: "String" },
        parentSupplierGroup: { type: "Pointer", targetClass: "SupplierGroup" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "TrainingResult",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        employees: { type: "Array" },
        status: { type: "String", required: false, defaultValue: "draft" },
        eventName: {
          type: "Pointer",
          targetClass: "TrainingEvent",
          required: false,
        },
        trainingEvent: { type: "Pointer", targetClass: "TrainingEvent" },
        name: { type: "String", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Supplier",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        isFrozen: { type: "Boolean" },
        preventPOs: { type: "Boolean" },
        preventRFQs: { type: "Boolean" },
        warnPOs: { type: "Boolean" },
        warnRFQs: { type: "Boolean" },
        isTransporter: { type: "Boolean" },
        isInternalSupplier: { type: "Boolean" },
        disabled: { type: "Boolean" },
        blockSupplier: { type: "Boolean" },
        name: { type: "String" },
        country: { type: "String" },
        defaultCompanyBankAccount: { type: "String" },
        taxID: { type: "String" },
        taxCategory: { type: "String" },
        taxWithholdingCategory: { type: "String" },
        supplierGroup: { type: "Pointer", targetClass: "SupplierGroup" },
        supplierType: { type: "String" },
        pan: { type: "String" },
        billingCurrency: { type: "String" },
        priceList: { type: "String" },
        defaultPaymentTermsTemplate: { type: "String" },
        holdType: { type: "String" },
        releaseDate: { type: "String" },
        website: { type: "String" },
        supplierDetails: { type: "String" },
        printLanguage: { type: "String" },
        accounts: { type: "Array" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "PaymentTerm",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: true, defaultValue: "NewTerm" },
        paymentMode: { type: "String", required: true },
        discountType: { type: "String", required: false },
        invoicePortion: { type: "Number", required: true },
        discountNumber: { type: "Number", required: false },
        series: { type: "String", required: true },
        creditDay: { type: "String" },
        description: { type: "String" },
        dueDateType: { type: "String", required: true },
        file: { type: "File", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "GoldPrice",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        date: { type: "Date", required: false },
        selling: { type: "Number", required: false },
        buying: { type: "Number", required: false },
        isActive: { type: "Boolean", required: false },
        brand: { type: "Pointer", targetClass: "Brand", required: false },
        sellingChange: { type: "Number", required: false },
        buyingChange: { type: "Number", required: false },
      },
      classLevelPermissions: {
        find: { "*": true, requiresAuthentication: true },
        count: { "*": true, requiresAuthentication: true },
        get: { "*": true, requiresAuthentication: true },
        create: { "*": true, requiresAuthentication: true },
        update: { "*": true, requiresAuthentication: true },
        delete: { "*": true, requiresAuthentication: true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "TrainingFeedback",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        feedback: { type: "String" },
        trainingEvent: {
          type: "Pointer",
          targetClass: "TrainingEvent",
          required: false,
        },
        employee: { type: "Pointer", targetClass: "Employee", required: false },
        name: { type: "String", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Driver",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        fullName: { type: "String" },
        status: { type: "String" },
        transporter: { type: "Pointer", targetClass: "Supplier" },
        employee: { type: "Pointer", targetClass: "Employee" },
        cellphoneNumber: { type: "String" },
        address: { type: "String" },
        licenseNumber: { type: "String" },
        issuingDate: { type: "String" },
        expiryDate: { type: "String" },
        series: { type: "String" },
        drivingLicense: { type: "Array" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Vehicle",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        vehicleValue: { type: "Number" },
        odometerValue: { type: "Number" },
        employee: { type: "Pointer", targetClass: "Employee" },
        model: { type: "String" },
        make: { type: "String" },
        licensePlate: { type: "String" },
        acquisitionDate: { type: "String" },
        location: { type: "String" },
        chassisNo: { type: "String" },
        insuranceCompany: { type: "String" },
        policyNo: { type: "String" },
        startDate: { type: "String" },
        EndDate: { type: "String" },
        fuelType: { type: "String" },
        fuelUOM: { type: "String" },
        lastCarbonCheck: { type: "String" },
        color: { type: "String" },
        drivingLicense: { type: "Array" },
        doors: { type: "Number" },
        wheels: { type: "Number" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "VehicleLog",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        fuelPrice: { type: "Number" },
        fuelQty: { type: "Number" },
        currentOdometerValue: { type: "Number" },
        supplier: { type: "Pointer", targetClass: "Supplier" },
        employee: { type: "Pointer", targetClass: "Employee" },
        licensePlate: { type: "Pointer", targetClass: "Vehicle" },
        date: { type: "String" },
        invoiceRef: { type: "String" },
        series: { type: "String" },
        serviceDetails: { type: "Array" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Category",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: false, defaultValue: "gia dung" },
        productCount: { type: "Number" },
        isActive: { type: "Boolean", required: false },
        image: { type: "File", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "LoanApplication",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        isFrozen: { type: "Boolean" },
        preventPOs: { type: "Boolean" },
        preventRFQs: { type: "Boolean" },
        warnPOs: { type: "Boolean" },
        warnRFQs: { type: "Boolean" },
        isSecuredLoan: { type: "Boolean" },
        applicantType: { type: "String" },
        applicant: { type: "String" },
        company: { type: "Pointer", targetClass: "Company" },
        postingDate: { type: "String" },
        status: { type: "String" },
        loanType: { type: "Pointer", targetClass: "LoanType" },
        loanAmount: { type: "String" },
        reason: { type: "String" },
        applicantForCustomer: { type: "Object" },
        applicantForEmployee: { type: "Pointer", targetClass: "Employee" },
        series: { type: "String" },
        loanSecurityDetails: { type: "Array" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "ShareHolder",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        title: { type: "String" },
        tag: { type: "String" },
        company: { type: "Pointer", targetClass: "Company", required: false },
        name: { type: "String" },
        transferType: { type: "String" },
        date: { type: "String" },
        fromShareholder: { type: "String" },
        fromFolioNo: { type: "String" },
        toShareholder: { type: "String" },
        toFolioNo: { type: "String" },
        equityLiabilityAccount: { type: "String" },
        assetAccount: { type: "String" },
        shareType: { type: "String" },
        fromNo: { type: "String" },
        rate: { type: "String" },
        noOfShares: { type: "String" },
        toNo: { type: "String" },
        remarks: { type: "String" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Menu",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        active: { type: "Boolean", required: false },
        name: { type: "String", required: false },
        icon: { type: "String", required: false },
        path: { type: "String", required: false },
        menu: { type: "Array", required: false },
        order: { type: "Number", required: false },
        isRootPath: { type: "Boolean", required: false, defaultValue: false },
        rootPath: { type: "Pointer", targetClass: "Menu", required: false },
        model: { type: "String", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "ShareTransfer",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
    },
    {
      className: "InterestRate",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: false },
        valueFrom: { type: "Number", required: false },
        valueTo: { type: "String", required: false },
        rate: { type: "Number", required: false },
        noPeriods: { type: "Number", required: false },
        isActive: { type: "Boolean", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Question",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        id: { type: "String", required: false },
        content: { type: "String", required: false },
        A: { type: "String", required: false },
        B: { type: "String", required: false },
        C: { type: "String", required: false },
        D: { type: "String", required: false },
        correctAnswer: { type: "String", required: false },
        category: { type: "Pointer", targetClass: "SysCfg", required: false },
        value: { type: "Object" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "_Installation",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        installationId: { type: "String" },
        deviceToken: { type: "String" },
        channels: { type: "Array" },
        deviceType: { type: "String" },
        pushType: { type: "String" },
        GCMSenderId: { type: "String" },
        timeZone: { type: "String" },
        localeIdentifier: { type: "String" },
        badge: { type: "Number" },
        appVersion: { type: "String" },
        appName: { type: "String" },
        appIdentifier: { type: "String" },
        parseVersion: { type: "String" },
        userId: { type: "Pointer", targetClass: "_User", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "ExamSession",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        startTime: { type: "Date", required: false },
        endTime: { type: "Date", required: false },
        answers: { type: "Array", required: false },
        questions: { type: "Array", required: false },
        isCompleted: { type: "Boolean", required: false },
        isPassed: { type: "Boolean", required: false },
        userId: { type: "String" },
        localId: { type: "String", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "login",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        username: { type: "String" },
        password: { type: "String" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "testRule",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: false },
      },
      classLevelPermissions: {
        find: {
          "role:VSJ": true,
          "role:Admin": true,
          "role:Staff": true,
          "role:Test": true,
        },
        count: {},
        get: { "role:VSJ": true },
        create: { "role:Admin": true, "role:Staff": true, "role:Test": true },
        update: { "role:VSJ": true, "role:Staff": true },
        delete: { "role:VSJ": true, "role:Staff": true, "role:Test": true },
        addField: {},
        protectedFields: {},
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "testt",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
      },
      classLevelPermissions: {
        find: { "role:VSJ": true, "role:Staff": true },
        count: {},
        get: { "role:VSJ": true, "role:Staff": true },
        create: { "role:VSJ": true, "role:Staff": true },
        update: { "role:Staff": true, "role:Test": true },
        delete: { "role:VSJ": true },
        addField: {},
        protectedFields: {},
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Request",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        contract: { type: "Pointer", targetClass: "Contract", required: false },
        status: { type: "String", required: false },
        type: { type: "String", required: false },
        customer: { type: "Pointer", targetClass: "Customer" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "testRulee",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
      },
      classLevelPermissions: {
        find: { "role:VSJ": true, "role:Staff": true, "role:Test": true },
        count: {},
        get: { "role:Staff": true, "role:Test": true },
        create: { "role:Staff": true, "role:Test": true },
        update: { "role:Staff": true, "role:Test": true },
        delete: { "role:Test": true },
        addField: {},
        protectedFields: {},
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "teeeeee",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
      },
      classLevelPermissions: {
        find: { "role:Staff": true },
        count: { "*": true },
        get: { "role:Staff": true },
        create: {},
        update: { "role:Staff": true },
        delete: { "role:Staff": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
    },
    {
      className: "teeeeeee",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
      },
      classLevelPermissions: {
        find: { "role:Staff": true },
        count: { "*": true },
        get: { "role:Staff": true },
        create: { "role:Staff": true },
        update: {},
        delete: { "role:Staff": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
    },
    {
      className: "requestPasswordReset",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        email: { type: "String" },
        password: { type: "String" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "KycInformation",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        fullName: { type: "String", required: false },
        CCCDNumber: { type: "String", required: false },
        CCCDFront: { type: "File", required: false },
        CCCDBack: { type: "File", required: false },
        CCCDIssueDate: { type: "Date", required: false },
        CCCDIssuePlace: { type: "String", required: false },
        birthday: { type: "Date", required: false },
        gender: { type: "String", required: false },
        portrait: { type: "File", required: false },
        status: { type: "String", required: false },
        customer: { type: "Pointer", targetClass: "Customer", required: false },
        country: { type: "String" },
        CCCDType: { type: "String" },
        address: { type: "String" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "ContractPeriod",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        contract: { type: "Pointer", targetClass: "Contract" },
        transaction: { type: "Pointer", targetClass: "Transaction" },
        period: { type: "Number" },
        beginBalance: { type: "Number" },
        generatedInterest: { type: "Number" },
        isActive: { type: "Boolean" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "TestItem",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: false },
        age: { type: "String", required: false },
        score: { type: "String", required: false },
        infor: { type: "String", required: false },
        amount: { type: "String", required: false },
        maKH: { type: "String", required: false },
        NameCustommer: { type: "String", required: false },
        source: { type: "String", required: false },
        distributor: { type: "String", required: false },
        amountGold: { type: "String", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "ImportedSession",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        importedAt: {
          type: "Date",
          required: true,
          defaultValue: { __type: "Date", iso: "2022-09-08T04:49:00.000Z" },
        },
        code: { type: "String", required: true },
        status: { type: "String", required: true, defaultValue: "Đang xử lý" },
        provider: { type: "String", required: true, defaultValue: "Live1" },
        paymentMethod: {
          type: "String",
          required: true,
          defaultValue: "Tiền mặt",
        },
        creator: { type: "Pointer", targetClass: "_User", required: true },
        wareHouse: {
          type: "Pointer",
          targetClass: "WareHouse",
          required: false,
        },
        vendor: { type: "Pointer", targetClass: "Vendor", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "TestTurnOver",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        brand: { type: "Pointer", targetClass: "Brand", required: false },
        price: { type: "Number", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "TestTurnoverAgent",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        agent: { type: "Pointer", targetClass: "TestAgent", required: false },
        turnover: { type: "Number", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "TestAgent",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "StockAuditSession",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        status: { type: "String", required: false },
        code: { type: "String", required: false },
        creator: { type: "Pointer", targetClass: "_User", required: false },
        source: { type: "Pointer", targetClass: "WareHouse", required: false },
        type: { type: "String" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "StockAuditItem",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        product: { type: "Pointer", targetClass: "Product", required: false },
        difference: { type: "Number", required: false },
        session: {
          type: "Pointer",
          targetClass: "StockAuditSession",
          required: false,
        },
        expectedQuantity: { type: "Number", required: false },
        actualQuantity: { type: "Number", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "TestSourceEmployee",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Dashboard",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        title: { type: "String", required: false },
        number: { type: "String", required: false },
        content: { type: "String", required: false },
        value: { type: "String", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
    },
    {
      className: "uestion",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        username: { type: "String" },
        password: { type: "String" },
      },
      classLevelPermissions: {
        find: {},
        count: { "*": true },
        get: {},
        create: {},
        update: {},
        delete: {},
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Promotion",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: false },
        percent: { type: "Number", required: false },
        fixed: { type: "Number", required: false },
        type: { type: "String", required: false },
        description: { type: "String", required: false },
        isActive: { type: "Boolean", required: false },
        policy: { type: "Array", required: false },
        startDate: { type: "Date", required: false },
        endDate: { type: "Date", required: false },
        series: { type: "String", required: false },
        budget: { type: "Number", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "DeletedItem",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        deletedObject: { type: "Object" },
        class: { type: "String" },
        deletedBy: { type: "Pointer", targetClass: "_User" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "ExportSession",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        code: { type: "String", required: false },
        status: { type: "String", required: false },
        wareHouse: {
          type: "Pointer",
          targetClass: "WareHouse",
          required: false,
        },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "ExportItem",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        quantity: { type: "Number", required: false },
        exportSession: {
          type: "Pointer",
          targetClass: "ExportSession",
          required: false,
        },
        product: { type: "Pointer", targetClass: "Product", required: false },
        price: { type: "Number", required: false },
        productVariance: {
          type: "Pointer",
          targetClass: "ProductVariance",
          required: false,
        },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "BankMessage",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        content: { type: "String", required: false },
        transaction: {
          type: "Pointer",
          targetClass: "Transaction",
          required: false,
        },
        isValid: { type: "Boolean" },
        from: { type: "String" },
        account: { type: "Pointer", targetClass: "Account" },
        amount: { type: "Number" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "ProductCategory",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: false },
        isActive: { type: "Boolean", required: false },
        image: { type: "File", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "TransactionAttachment",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        note: { type: "String", required: false },
        attachments: { type: "Array", required: true },
        transaction: {
          type: "Pointer",
          targetClass: "Transaction",
          required: true,
        },
        createdBy: { type: "Pointer", targetClass: "_User", required: true },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Template",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        title: { type: "String", required: false },
        content: { type: "String", required: false },
        signatureOfVSJ: { type: "File", required: false },
        model: { type: "String", required: false },
        script: { type: "String", required: false },
        name: { type: "String", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "Campaign",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: false },
        description: { type: "String", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "AppointmentAttachment",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        note: { type: "String" },
        createdBy: { type: "Pointer", targetClass: "_User" },
        attachments: { type: "Array" },
        appointment: {
          type: "Pointer",
          targetClass: "Appointment",
          required: false,
        },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "ContractAttachment",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        note: { type: "String" },
        attachments: { type: "Array" },
        contract: { type: "Pointer", targetClass: "Contract" },
        createdBy: { type: "Pointer", targetClass: "_User" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "ProductVariance",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        product: { type: "Pointer", targetClass: "Product", required: true },
        color: { type: "String", required: false },
        size: { type: "String", required: false },
        barcode: { type: "String", required: false },
        quantity: { type: "Number" },
        totalWeight: { type: "String", required: false },
        stoneWeight: { type: "String", required: false },
        goldWeight: { type: "String", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "ImportedItem",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        productVariance: {
          type: "Pointer",
          targetClass: "ProductVariance",
          required: false,
        },
        product: { type: "Pointer", targetClass: "Product", required: true },
        importedPrice: { type: "Number", required: true, defaultValue: 0 },
        quantity: { type: "Number", required: true, defaultValue: 0 },
        total: { type: "Number", required: true, defaultValue: 0 },
        importedSession: { type: "Pointer", targetClass: "ImportedSession" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "InvestContract",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
    },
    {
      className: "Vendor",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: false },
        address: { type: "String", required: false },
        phone: { type: "String", required: false },
        contact: { type: "String", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "StockChangeSession",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        type: { type: "String", required: false },
        vendor: { type: "Pointer", targetClass: "Vendor", required: false },
        code: { type: "String", required: false },
        source: { type: "Pointer", targetClass: "WareHouse", required: false },
        target: { type: "Pointer", targetClass: "WareHouse", required: false },
        creator: { type: "Pointer", targetClass: "_User", required: false },
        status: { type: "String", required: false },
        importedAt: { type: "Date", required: false },
        scanImage: { type: "File", required: false },
        order: { type: "Pointer", targetClass: "Order", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "StockChangeItem",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        product: { type: "Pointer", targetClass: "Product", required: false },
        quantity: { type: "Number", required: false },
        session: {
          type: "Pointer",
          targetClass: "StockChangeSession",
          required: false,
        },
        importedPrice: { type: "Number", required: false },
        productVariance: { type: "Pointer", targetClass: "ProductVariance" },
        reason: { type: "String", required: false },
        source: { type: "Pointer", targetClass: "WareHouse" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "StockReport",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        barcode: { type: "String" },
        product: { type: "Pointer", targetClass: "Product" },
        quantity: { type: "Number" },
        warehouse: { type: "Pointer", targetClass: "WareHouse" },
        productVariance: { type: "Pointer", targetClass: "ProductVariance" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "GoldWeight",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        value: { type: "Number", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "TrainingContent",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: false },
        code: { type: "String", required: false },
        content: { type: "String", required: false },
        link: { type: "String", required: false },
        thumbnail: { type: "File", required: false },
        isActive: { type: "Boolean", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "PrintJob",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        image: { type: "File", required: false },
        page1: { type: "String" },
        page2: { type: "Object" },
        other: { type: "String" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "DMDJFZAfHZ",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        page1: { type: "String" },
        page2: { type: "Object" },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "PageTemplate",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        name: { type: "String", required: false },
        content: { type: "String", required: false },
        model: { type: "String", required: false },
        isMaster: { type: "Boolean", required: false },
        master: {
          type: "Pointer",
          targetClass: "PageTemplate",
          required: false,
        },
        configuration: { type: "Object", required: false },
        script: { type: "String", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
      indexes: { _id_: { _id: 1 } },
    },
    {
      className: "PurchaseOrder",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        code: { type: "String", required: false },
        customer: { type: "Pointer", targetClass: "Customer", required: false },
        cashier: { type: "Pointer", targetClass: "Employee", required: false },
        total: { type: "Number", required: false },
        paymentMethod: { type: "String", required: false },
        branch: { type: "Pointer", targetClass: "Branch", required: false },
        note: { type: "String", required: false },
        codeNumber: { type: "Number", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
    },
    {
      className: "PurchaseOrderItem",
      fields: {
        objectId: { type: "String" },
        createdAt: { type: "Date" },
        updatedAt: { type: "Date" },
        ACL: { type: "ACL" },
        purchaseOrder: {
          type: "Pointer",
          targetClass: "PurchaseOrder",
          required: false,
        },
        goldType: { type: "String", required: false },
        total: { type: "Number", required: false },
        weight: { type: "Number", required: false },
      },
      classLevelPermissions: {
        find: { "*": true },
        count: { "*": true },
        get: { "*": true },
        create: { "*": true },
        update: { "*": true },
        delete: { "*": true },
        addField: { "*": true },
        protectedFields: { "*": [] },
      },
    },
  ],
};

const getTableConfig = modelName => {
  const quickCfg = TABLE_QUICK_CONFIG[modelName];
  if (!quickCfg) return {};

  let tblConfig = {};
  let schema = SCHEMAS.tables.filter(table => table.className === modelName);
  if (schema.length > 0) schema = schema[0];
  else return {};

  // generate table config
  tblConfig.columns = quickCfg.columns.split("|").map(item => {
    const [fieldInfo, sort, search] = item.split(",");
    const [field, fieldText] = fieldInfo.split(":");
    return {
      field: field,
      type: schema.fields[field],
      sort: sort,
      search: search,
      fieldText: fieldText,
    };
  });

  return tblConfig;
};

export const SCHEMAS2 = {
  tables: [
    {
      className: "_User",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        username: {
          type: "String",
        },
        password: {
          type: "String",
        },
        email: {
          type: "String",
        },
        emailVerified: {
          type: "Boolean",
        },
        authData: {
          type: "Object",
        },
        phone: {
          type: "String",
        },
        lastName: {
          type: "String",
        },
        firstName: {
          type: "String",
        },
        status: {
          type: "String",
        },
        verifiedCode: {
          type: "Number",
          required: false,
        },
        otp: {
          type: "Number",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
        username_1: {
          username: 1,
        },
        case_insensitive_username: {
          username: 1,
        },
        email_1: {
          email: 1,
        },
        case_insensitive_email: {
          email: 1,
        },
      },
    },
    {
      className: "_Role",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
        },
        users: {
          type: "Relation",
          targetClass: "_User",
        },
        roles: {
          type: "Relation",
          targetClass: "_Role",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
        name_1: {
          name: 1,
        },
      },
    },
    {
      className: "Employee",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        firstName: {
          type: "String",
        },
        middleName: {
          type: "String",
        },
        lastName: {
          type: "String",
        },
        active: {
          type: "Boolean",
        },
        emergencyContact: {
          type: "Object",
        },
        joiningInfo: {
          type: "Object",
        },
        approvers: {
          type: "Object",
        },
        salary: {
          type: "Object",
        },
        contact: {
          type: "Object",
        },
        personalInfo: {
          type: "Object",
        },
        healthInsurance: {
          type: "Object",
        },
        personalDetails: {
          type: "Object",
        },
        educationalQualifications: {
          type: "Array",
        },
        historyInCompany: {
          type: "Array",
        },
        exit: {
          type: "Object",
        },
        gender: {
          type: "String",
        },
        dob: {
          type: "String",
        },
        designation: {
          type: "String",
        },
        employeeId: {
          type: "String",
        },
        status: {
          type: "String",
        },
        erpNextUser: {
          type: "String",
        },
        departmentAndGrade: {
          type: "Object",
        },
        contactDetail: {
          type: "Object",
        },
        attendanceAndLeaveDetails: {
          type: "Object",
        },
        previousWorkExperience: {
          type: "Array",
        },
        doj: {
          type: "String",
        },
        salutation: {
          type: "String",
        },
        employmentType: {
          type: "String",
        },
        personalBio: {
          type: "Object",
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
          required: false,
        },
        user: {
          type: "Pointer",
          targetClass: "_User",
          required: false,
        },
        series: {
          type: "String",
          required: false,
        },
        fullName: {
          type: "String",
          required: false,
        },
        contracts: {
          type: "Array",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          requiresAuthentication: true,
        },
        count: {
          requiresAuthentication: true,
        },
        get: {
          requiresAuthentication: true,
        },
        create: {
          requiresAuthentication: true,
        },
        update: {
          requiresAuthentication: true,
        },
        delete: {
          requiresAuthentication: true,
        },
        addField: {
          requiresAuthentication: true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
        firstName_text: {
          firstName: "text",
        },
        series_regex: {
          series: 1,
        },
        fullname_idx: {
          fullName: 1,
        },
        series_idx: {
          series: 1,
        },
      },
    },
    {
      className: "_Session",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        user: {
          type: "Pointer",
          targetClass: "_User",
        },
        installationId: {
          type: "String",
        },
        sessionToken: {
          type: "String",
        },
        expiresAt: {
          type: "Date",
        },
        createdWith: {
          type: "Object",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "Department",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
        },
        createdBy: {
          type: "Pointer",
          targetClass: "_User",
          required: false,
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
          required: false,
        },
        status: {
          type: "String",
          required: false,
          defaultValue: "Enabled",
        },
        department: {
          type: "String",
          required: false,
        },
        parentDepartment: {
          type: "String",
          required: false,
        },
        isGroup: {
          type: "Boolean",
          required: false,
        },
        disabled: {
          type: "Boolean",
        },
        payrollCostCenter: {
          type: "String",
        },
        leaveApprover: {
          type: "Array",
        },
        expenseApprover: {
          type: "Array",
        },
        shiftRequestApprover: {
          type: "Array",
        },
        costCenter: {
          type: "Pointer",
          targetClass: "CostCenter",
        },
        leaveBlockList: {
          type: "Pointer",
          targetClass: "LeaveBlockList",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "SysCfg",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        Name: {
          type: "String",
          required: false,
        },
        Code: {
          type: "String",
          required: false,
        },
        Company: {
          type: "Pointer",
          targetClass: "Company",
          required: false,
        },
        Values: {
          type: "Array",
          required: false,
        },
        Category: {
          type: "String",
          required: false,
        },
        value: {
          type: "String",
          required: false,
        },
        configuration: {
          type: "Object",
          required: false,
        },
        active: {
          type: "Boolean",
          required: false,
        },
        valueObj: {
          type: "Object",
          required: false,
        },
        isActive: {
          type: "Boolean",
          required: false,
        },
        thumbnail: {
          type: "File",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "Company",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
          required: false,
        },
        address: {
          type: "Object",
          required: false,
          defaultValue: {},
        },
        domainName: {
          type: "String",
          required: false,
        },
        logo: {
          type: "File",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "Attendance",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        status: {
          type: "String",
          required: false,
        },
        employee: {
          type: "Pointer",
          targetClass: "Employee",
          required: false,
        },
        date: {
          type: "Date",
          required: false,
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
          required: false,
        },
        earlyExit: {
          type: "Boolean",
          required: false,
        },
        lateEntry: {
          type: "Boolean",
          required: false,
        },
        series: {
          type: "String",
        },
        shift: {
          type: "Pointer",
          targetClass: "ShiftType",
        },
        requests: {
          type: "Array",
        },
        leaveType: {
          type: "Pointer",
          targetClass: "LeaveType",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "Shift",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
    },
    {
      className: "LeaveApplication",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        series: {
          type: "String",
          required: false,
        },
        leaveType: {
          type: "Pointer",
          targetClass: "LeaveType",
          required: false,
        },
        employee: {
          type: "Pointer",
          targetClass: "Employee",
          required: false,
        },
        fromDate: {
          type: "String",
          required: false,
        },
        toDate: {
          type: "String",
          required: false,
        },
        halfDay: {
          type: "Boolean",
          required: false,
        },
        reason: {
          type: "String",
          required: false,
        },
        leaveApprover: {
          type: "String",
          required: false,
        },
        status: {
          type: "String",
          required: false,
        },
        salarySlip: {
          type: "Pointer",
          targetClass: "SalarySlip",
          required: false,
        },
        postingDate: {
          type: "String",
          required: false,
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
          required: false,
        },
        letterHead: {
          type: "String",
          required: false,
        },
        followViaEmail: {
          type: "Boolean",
        },
        totalLeaveDays: {
          type: "Number",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "Branch",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        address: {
          type: "Object",
          required: false,
          defaultValue: {
            street: "",
            ward: "",
            district: "",
            city: "",
          },
        },
        isActive: {
          type: "Boolean",
          required: false,
          defaultValue: true,
        },
        name: {
          type: "String",
          required: true,
        },
        images: {
          type: "Array",
          required: false,
        },
        thumbnail: {
          type: "File",
          required: false,
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
          required: false,
        },
        companyName: {
          type: "String",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "EmployeeGroup",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
          required: false,
        },
        employee: {
          type: "Array",
          required: false,
        },
        query: {
          type: "String",
        },
        emmployee: {
          type: "Array",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "Customer",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
          required: false,
        },
        type: {
          type: "String",
        },
        pan: {
          type: "String",
        },
        taxID: {
          type: "String",
        },
        defaultCompanyBankAccount: {
          type: "String",
        },
        taxCategory: {
          type: "String",
        },
        fromLead: {
          type: "String",
        },
        billingCurrency: {
          type: "String",
        },
        defaultPriceList: {
          type: "String",
        },
        fullName: {
          type: "String",
        },
        emailId: {
          type: "String",
        },
        mobileNo: {
          type: "String",
        },
        addressLine1: {
          type: "String",
        },
        addressLine2: {
          type: "String",
        },
        zipCode: {
          type: "String",
        },
        city: {
          type: "String",
        },
        state: {
          type: "String",
        },
        country: {
          type: "String",
        },
        territory: {
          type: "Pointer",
          targetClass: "Territory",
          required: false,
        },
        customerGroup: {
          type: "Pointer",
          targetClass: "CustomerGroup",
          required: false,
        },
        status: {
          type: "String",
          required: false,
          defaultValue: "Enabled",
        },
        defaultPaymentTermsTemplate: {
          type: "String",
        },
        customerId: {
          type: "String",
          required: false,
        },
        creationWithoutSalesOrder: {
          type: "Boolean",
        },
        creationWithoutDeliveyNote: {
          type: "Boolean",
        },
        disabled: {
          type: "Boolean",
        },
        isInternalCustomer: {
          type: "Boolean",
        },
        isFrozen: {
          type: "Boolean",
        },
        accountManager: {
          type: "Pointer",
          targetClass: "_User",
          required: false,
        },
        customerPrimaryContact: {
          type: "String",
        },
        customerPrimaryAddress: {
          type: "String",
        },
        representsCompany: {
          type: "String",
        },
        paymentTermsTemplate: {
          type: "String",
        },
        customerDetails: {
          type: "String",
        },
        marketSegment: {
          type: "String",
        },
        industry: {
          type: "String",
        },
        printLanguage: {
          type: "String",
        },
        loyaltyProgram: {
          type: "String",
        },
        salesPartner: {
          type: "String",
        },
        commissionRate: {
          type: "String",
        },
        accounts: {
          type: "Array",
        },
        creditLimit: {
          type: "Array",
        },
        salesTeam: {
          type: "Array",
        },
        taxWithholdingCategory: {
          type: "Pointer",
          targetClass: "TaxWithholdingCategory",
          required: false,
        },
        user: {
          type: "Pointer",
          targetClass: "_User",
          required: false,
        },
        CCCDBack: {
          type: "File",
          required: false,
        },
        CCCDFront: {
          type: "File",
          required: false,
        },
        address: {
          type: "Pointer",
          targetClass: "Address",
          required: false,
        },
        account: {
          type: "Array",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": ["address"],
          "role:Test": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "SalaryComponent",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
          required: false,
        },
        abbr: {
          type: "String",
          required: false,
        },
        description: {
          type: "String",
          required: false,
        },
        status: {
          type: "Boolean",
          required: false,
        },
        rthni: {
          type: "Boolean",
        },
        disable: {
          type: "Boolean",
        },
        amount: {
          type: "String",
          required: false,
          defaultValue: "0",
        },
        condition: {
          type: "String",
        },
        type: {
          type: "String",
          required: false,
        },
        dependsOnPaymentDays: {
          type: "Boolean",
        },
        isTaxApplicable: {
          type: "Boolean",
        },
        roundTo: {
          type: "Boolean",
        },
        statisticalComponent: {
          type: "Boolean",
        },
        notIncludeInTotal: {
          type: "Boolean",
        },
        disabled: {
          type: "Boolean",
        },
        isFlexibleBenefit: {
          type: "Boolean",
        },
        amountBasedOnFormula: {
          type: "Boolean",
        },
        dataTableAccount: {
          type: "Array",
        },
        deductFullTax: {
          type: "Boolean",
        },
        isIncomeTaxComponent: {
          type: "Boolean",
          required: false,
        },
        variableBasedOnTaxableSalary: {
          type: "Boolean",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "Contact",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
          required: false,
        },
        emailAddress: {
          type: "String",
          required: false,
        },
        companyName: {
          type: "Pointer",
          targetClass: "Company",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "Opportunity",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        title: {
          type: "String",
          required: false,
        },
        status: {
          type: "String",
        },
        series: {
          type: "String",
        },
        opportunityFrom: {
          type: "String",
        },
        party: {
          type: "String",
        },
        source: {
          type: "String",
        },
        opportunityType: {
          type: "String",
        },
        convertedBy: {
          type: "String",
        },
        salesStage: {
          type: "String",
        },
        expectedClosingDate: {
          type: "String",
        },
        currency: {
          type: "String",
        },
        opportunityAmount: {
          type: "String",
        },
        probability: {
          type: "String",
        },
        customer: {
          type: "String",
        },
        lead: {
          type: "String",
        },
        name: {
          type: "String",
        },
        id: {
          type: "Number",
        },
        company: {
          type: "String",
        },
        opportunityDate: {
          type: "String",
        },
        printLanguage: {
          type: "String",
        },
        nextContactBy: {
          type: "String",
        },
        nextContactDate: {
          type: "String",
        },
        toDiscuss: {
          type: "String",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "SalaryStructure",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
          required: false,
        },
        letterHead: {
          type: "String",
          required: false,
        },
        payrollFrequency: {
          type: "String",
          required: false,
        },
        currency: {
          type: "String",
          required: false,
        },
        modeOfPayment: {
          type: "String",
          required: false,
        },
        paymentAccount: {
          type: "String",
          required: false,
        },
        leaveEncashmentAmountPerDay: {
          type: "String",
          required: false,
        },
        maxBenefits: {
          type: "String",
          required: false,
        },
        modeOfmPayment: {
          type: "String",
        },
        isActive: {
          type: "String",
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
        },
        dataTableEarning: {
          type: "Array",
        },
        dataTableDeductions: {
          type: "Array",
        },
        isAcitve: {
          type: "String",
        },
        basedOnTimesheet: {
          type: "Boolean",
        },
        hourRate: {
          type: "String",
        },
        salaryComponent: {
          type: "Pointer",
          targetClass: "SalaryComponent",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "Appointment",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        scheduledTime: {
          type: "String",
          required: true,
        },
        name: {
          type: "String",
          required: true,
        },
        email: {
          type: "String",
          required: true,
        },
        phoneNumber: {
          type: "String",
          required: false,
        },
        skypeID: {
          type: "String",
          required: false,
        },
        details: {
          type: "String",
          required: false,
        },
        appointmentWith: {
          type: "String",
          required: false,
        },
        party: {
          type: "String",
          required: false,
        },
        calendarEvent: {
          type: "String",
          required: false,
        },
        phoneNo: {
          type: "String",
        },
        status: {
          type: "String",
          required: true,
        },
        id: {
          type: "Number",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "Lead",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        leadId: {
          type: "String",
          required: false,
        },
        name: {
          type: "String",
          required: false,
        },
        organizationName: {
          type: "String",
          required: false,
        },
        isOrganization: {
          type: "String",
          required: false,
        },
        email: {
          type: "String",
          required: false,
        },
        leadOwner: {
          type: "String",
          required: false,
        },
        status: {
          type: "String",
          required: false,
        },
        salutation: {
          type: "String",
          required: false,
        },
        designation: {
          type: "String",
          required: false,
        },
        gender: {
          type: "String",
          required: false,
        },
        source: {
          type: "String",
          required: false,
        },
        campaign: {
          type: "String",
          required: false,
        },
        followUp: {
          type: "Object",
          required: false,
          defaultValue: {
            nextContactBy: "",
            nextContactDate: "",
            endOn: "",
          },
        },
        notes: {
          type: "String",
          required: false,
        },
        address: {
          type: "Object",
          required: false,
          defaultValue: {
            addressType: "",
            addressTitle: "",
            addressLine1: "",
            addressLine2: "",
            city: "",
            country: "",
            postalCode: "",
          },
        },
        contact: {
          type: "Object",
          required: false,
          defaultValue: {
            phone: "",
            mobileNo: "",
            fax: "",
            website: "",
          },
        },
        moreInfo: {
          type: "Object",
          required: false,
          defaultValue: {
            leadType: "",
            marketSegment: "",
            industry: "",
            requestType: "",
            company: "",
            territory: "",
            printLanguage: "",
            unsubscribed: false,
            blogSubscriber: false,
          },
        },
        series: {
          type: "String",
        },
        personName: {
          type: "String",
        },
        emailAddress: {
          type: "String",
        },
        campaignName: {
          type: "String",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "Account",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
          required: false,
        },
        type: {
          type: "String",
          required: false,
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
          required: false,
        },
        balance: {
          type: "Number",
          required: false,
          defaultValue: 0,
        },
        bank: {
          type: "Pointer",
          targetClass: "SysCfg",
          required: false,
        },
        linkedWith: {
          type: "Pointer",
          targetClass: "Account",
          required: false,
        },
        interCompanyAccount: {
          type: "Boolean",
        },
        currency: {
          type: "String",
        },
        rate: {
          type: "String",
        },
        Balance: {
          type: "String",
        },
        isGroup: {
          type: "Boolean",
          required: false,
          defaultValue: false,
        },
        rootType: {
          type: "String",
          required: false,
        },
        customer: {
          type: "Pointer",
          targetClass: "Customer",
          required: false,
        },
        nodeChild: {
          type: "Array",
          required: false,
        },
        nodeParent: {
          type: "Array",
          required: false,
        },
        parentAccount: {
          type: "Pointer",
          targetClass: "Account",
        },
        code: {
          type: "String",
          required: false,
        },
        attribute: {
          type: "Object",
          required: false,
        },
        accountNumber: {
          type: "String",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "PayrollEntry",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        postingDate: {
          type: "String",
        },
        currency: {
          type: "String",
        },
        payrollFrequency: {
          type: "String",
        },
        payrollPayableAccount: {
          type: "String",
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
        },
        startDate: {
          type: "String",
        },
        endDate: {
          type: "String",
        },
        costCenter: {
          type: "String",
        },
        department: {
          type: "Pointer",
          targetClass: "DepartmentSelected",
        },
        designation: {
          type: "String",
        },
        project: {
          type: "String",
        },
        grievanceType: {
          type: "String",
        },
        bankAccount: {
          type: "String",
        },
        branch: {
          type: "Pointer",
          targetClass: "Branch",
        },
        employee: {
          type: "Pointer",
          targetClass: "Employee",
        },
        Branch: {
          type: "String",
        },
        name: {
          type: "String",
        },
        validateAttendance: {
          type: "Boolean",
        },
        salarySlipBasedOnTimesheet: {
          type: "Boolean",
        },
        deductTaxForUnclaimed: {
          type: "Boolean",
        },
        deductTaxForUnsubmittedTax: {
          type: "Boolean",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "CostCenter",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
          required: false,
        },
        costCenterName: {
          type: "String",
          required: false,
        },
        isGroup: {
          type: "Boolean",
          required: false,
        },
        disabled: {
          type: "Boolean",
          required: false,
        },
        parentCostCenter: {
          type: "String",
          required: false,
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
          required: false,
        },
        distributedCostCenter: {
          type: "Array",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "SalaryStructureAssignment",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        variable: {
          type: "Number",
        },
        base: {
          type: "Number",
        },
        fromDate: {
          type: "String",
        },
        salaryStructure: {
          type: "Pointer",
          targetClass: "SalaryStructure",
        },
        employee: {
          type: "Pointer",
          targetClass: "Employee",
        },
        name: {
          type: "String",
        },
        incomeTaxSlab: {
          type: "Pointer",
          targetClass: "IncomeTaxSlab",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "CustomerGroup",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        customerGroupName: {
          type: "String",
          required: true,
        },
        name: {
          type: "String",
          required: false,
        },
        parentCustomerGroup: {
          type: "String",
          required: false,
        },
        isGroup: {
          type: "Boolean",
          required: false,
        },
        defaultPaymentTermsTemplate: {
          type: "String",
        },
        defaultPriceList: {
          type: "String",
        },
        id: {
          type: "Number",
        },
        type: {
          type: "String",
        },
        customerGroup: {
          type: "Pointer",
          targetClass: "CustomerGroup",
        },
        territory: {
          type: "Pointer",
          targetClass: "Territory",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "Territory",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        territoryName: {
          type: "String",
          required: false,
        },
        parentTerritory: {
          type: "String",
          required: false,
        },
        isGroup: {
          type: "Boolean",
          required: false,
        },
        name: {
          type: "String",
          required: false,
        },
        territoryManager: {
          type: "String",
          required: false,
        },
        id: {
          type: "Number",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "SalesPerson",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        employee: {
          type: "Pointer",
          targetClass: "Employee",
          required: false,
        },
        name: {
          type: "String",
          required: false,
        },
        salesPersonName: {
          type: "String",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "JobOpening",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        jobTitle: {
          type: "String",
          required: false,
        },
        designation: {
          type: "String",
          required: false,
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
          required: false,
        },
        status: {
          type: "String",
          required: false,
        },
        publishOnWebsite: {
          type: "Boolean",
          required: false,
        },
        description: {
          type: "String",
          required: false,
        },
        currency: {
          type: "String",
          required: false,
        },
        publishSalaryRange: {
          type: "Boolean",
          required: false,
        },
        upperRange: {
          type: "Number",
          required: false,
        },
        lowerRange: {
          type: "Number",
          required: false,
        },
        department: {
          type: "String",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "SalarySlip",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        employee: {
          type: "Pointer",
          targetClass: "Employee",
        },
        postingDate: {
          type: "String",
        },
        salarySlipBasedOnTimesheet: {
          type: "Boolean",
        },
        deductTaxForUnclaimed: {
          type: "Boolean",
        },
        deductTaxForUnsubmittedTax: {
          type: "Boolean",
        },
        letterHead: {
          type: "String",
        },
        startDate: {
          type: "String",
        },
        endDate: {
          type: "String",
        },
        payrollFrequency: {
          type: "String",
        },
        name: {
          type: "String",
        },
        dataTableDeductions: {
          type: "Array",
        },
        dataTableEarning: {
          type: "Array",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "EmployeeOtherIncome",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
        },
        employee: {
          type: "Pointer",
          targetClass: "Employee",
        },
        payrollPeriod: {
          type: "Pointer",
          targetClass: "PayrollPeriod",
        },
        name: {
          type: "String",
          required: false,
        },
        source: {
          type: "String",
        },
        amount: {
          type: "Number",
          required: true,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "AdditionalSalary",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        series: {
          type: "String",
          required: false,
        },
        isRecurring: {
          type: "Boolean",
          required: false,
          defaultValue: false,
        },
        payrollDate: {
          type: "String",
          required: false,
        },
        fromDate: {
          type: "String",
          required: false,
        },
        toDate: {
          type: "String",
          required: false,
        },
        deductFullTax: {
          type: "Boolean",
          required: false,
          defaultValue: false,
        },
        overwriteSalaryStructureAmount: {
          type: "Boolean",
          required: false,
          defaultValue: false,
        },
        code: {
          type: "Number",
        },
        error: {
          type: "String",
        },
        Currency: {
          type: "String",
          required: false,
          defaultValue: "VND",
        },
        amount: {
          type: "Number",
          required: false,
        },
        currency: {
          type: "String",
        },
        employee: {
          type: "Pointer",
          targetClass: "Employee",
          required: true,
        },
        salaryComponent: {
          type: "Pointer",
          targetClass: "SalaryComponent",
          required: true,
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
          required: true,
        },
        incentiveAmount: {
          type: "Number",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "JobApplicantSource",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
          required: false,
        },
        description: {
          type: "String",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "EmployeeSkillMap",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        employee: {
          type: "Pointer",
          targetClass: "Employee",
          required: false,
        },
        employeeName: {
          type: "String",
          required: false,
        },
        designation: {
          type: "String",
          required: false,
        },
        skills: {
          type: "Array",
          required: false,
        },
        trainings: {
          type: "Array",
          required: false,
        },
        employeeSkills: {
          type: "Array",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "JobApplicant",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
        },
        email: {
          type: "String",
        },
        phone: {
          type: "String",
        },
        country: {
          type: "String",
        },
        status: {
          type: "String",
        },
        coverLetter: {
          type: "String",
        },
        resumeLink: {
          type: "String",
        },
        currency: {
          type: "String",
        },
        lowerRange: {
          type: "String",
        },
        upperRange: {
          type: "String",
        },
        rate: {
          type: "Number",
        },
        jobOpening: {
          type: "Pointer",
          targetClass: "JobOpening",
          required: false,
        },
        source: {
          type: "Pointer",
          targetClass: "JobApplicantSource",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "EmployeePromotion",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        employee: {
          type: "Pointer",
          targetClass: "Employee",
          required: false,
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
          required: false,
        },
        promotionDate: {
          type: "String",
          required: false,
        },
        employeePromotionDetail: {
          type: "Array",
          required: false,
        },
        status: {
          type: "String",
          required: false,
          defaultValue: "draft",
        },
        employeePromotionDetails: {
          type: "Array",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "PayrollPeriod",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        payrollPeriodName: {
          type: "String",
        },
        company: {
          type: "String",
        },
        startDate: {
          type: "String",
        },
        endDate: {
          type: "String",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "TermAndCondition",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        title: {
          type: "String",
          required: false,
        },
        disabled: {
          type: "Boolean",
          required: false,
        },
        isSelling: {
          type: "Boolean",
          required: false,
        },
        isBuying: {
          type: "Boolean",
          required: false,
        },
        isHR: {
          type: "Boolean",
          required: false,
        },
        description: {
          type: "String",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "IncomeTaxSlab",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
          required: true,
        },
        effectiveFrom: {
          type: "String",
          required: true,
        },
        currency: {
          type: "String",
          required: true,
        },
        taxExemptionAmount: {
          type: "String",
          required: false,
        },
        allowTaxExemption: {
          type: "Boolean",
          required: false,
          defaultValue: false,
        },
        disabled: {
          type: "Boolean",
          required: false,
          defaultValue: false,
        },
        taxableSalarySlabs: {
          type: "Array",
          required: true,
        },
        taxesAndChargesOnIncomeTax: {
          type: "Array",
          required: false,
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "EmployeeTaxExemptionCategory",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        maxExemptionAmount: {
          type: "Number",
        },
        name: {
          type: "String",
        },
        active: {
          type: "Boolean",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "EmployeeTaxExemptionSubCategory",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        taxExemptionCategory: {
          type: "Pointer",
          targetClass: "EmployeeTaxExemptionCategory",
        },
        maxExemptionAmount: {
          type: "Number",
        },
        name: {
          type: "String",
        },
        active: {
          type: "Boolean",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "EmployeeTaxExemptionDeclaration",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        employee: {
          type: "Pointer",
          targetClass: "Employee",
          required: true,
        },
        payrollPeriod: {
          type: "Pointer",
          targetClass: "PayrollPeriod",
          required: true,
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
          required: false,
        },
        currency: {
          type: "String",
          required: true,
        },
        name: {
          type: "String",
          required: true,
        },
        declarations: {
          type: "Array",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "JobOffer",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        series: {
          type: "String",
          required: false,
        },
        jobApplicant: {
          type: "Pointer",
          targetClass: "JobApplicant",
        },
        status: {
          type: "String",
        },
        offerDate: {
          type: "String",
        },
        designation: {
          type: "String",
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
        },
        termAndCondition: {
          type: "Pointer",
          targetClass: "TermAndCondition",
        },
        letterHead: {
          type: "String",
        },
        printHeading: {
          type: "String",
        },
        jobOfferTerm: {
          type: "Array",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "EmployeeTaxExemptionProofSubmission",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        employee: {
          type: "Pointer",
          targetClass: "Employee",
          required: true,
        },
        submissionDate: {
          type: "String",
          required: true,
          defaultValue: "",
        },
        payrollPeriod: {
          type: "Pointer",
          targetClass: "PayrollPeriod",
          required: true,
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
          required: true,
        },
        taxExemptionProofs: {
          type: "Array",
          required: false,
        },
        currency: {
          type: "String",
        },
        name: {
          type: "String",
          required: true,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "EmployeeGrade",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
          required: false,
        },
        salaryStructure: {
          type: "Pointer",
          targetClass: "SalaryStructure",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "LeaveBlockList",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        leaveBlockListName: {
          type: "String",
          required: false,
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
          required: false,
        },
        leaveBlockListDates: {
          type: "Array",
          required: false,
        },
        leaveBlockListAllowed: {
          type: "Array",
          required: false,
        },
        appliesToCompany: {
          type: "Boolean",
          required: false,
        },
        name: {
          type: "String",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "RetentionBonus",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
        },
        employee: {
          type: "Pointer",
          targetClass: "Employee",
        },
        bonusPaymentDate: {
          type: "String",
        },
        bonusAmount: {
          type: "String",
        },
        salaryComponent: {
          type: "Pointer",
          targetClass: "SalaryComponent",
        },
        name: {
          type: "String",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "EmployeeOnboardingTemplate",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
          required: false,
        },
        designation: {
          type: "String",
          required: false,
        },
        department: {
          type: "String",
          required: false,
        },
        activities: {
          type: "Array",
          required: false,
        },
        employeeGrade: {
          type: "Pointer",
          targetClass: "EmployeeGrade",
          required: false,
        },
        series: {
          type: "String",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "LeaveType",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        leaveTypeName: {
          type: "String",
          required: false,
        },
        name: {
          type: "String",
          required: false,
        },
        maxLeavesAllowed: {
          type: "String",
          required: false,
        },
        applicableAfter: {
          type: "String",
          required: false,
        },
        maximumContinuousDaysApplicable: {
          type: "String",
          required: false,
        },
        isCarryForward: {
          type: "Boolean",
          required: false,
        },
        isLeaveWithoutPay: {
          type: "Boolean",
          required: false,
        },
        isPartiallyPaidLeave: {
          type: "Boolean",
          required: false,
        },
        isOptionalLeave: {
          type: "Boolean",
          required: false,
        },
        allowNegativeBalance: {
          type: "Boolean",
          required: false,
        },
        includeHolidaysWithinLeavesAsLeaves: {
          type: "Boolean",
          required: false,
        },
        isCompensatory: {
          type: "Boolean",
          required: false,
        },
        earningComponent: {
          type: "Pointer",
          targetClass: "SalaryComponent",
          required: false,
        },
        earnedLeaveFrequency: {
          type: "String",
          required: false,
        },
        rounding: {
          type: "String",
          required: false,
        },
        encashmentThresholdDays: {
          type: "String",
          required: false,
        },
        fractionOfDailySalaryPerLeave: {
          type: "String",
        },
        maximumCarryForwardedLeaves: {
          type: "String",
        },
        expireCarryForwardedLeaves: {
          type: "String",
        },
        basedOnDateOfJoining: {
          type: "Boolean",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "EmployeeIncentive",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        employee: {
          type: "Pointer",
          targetClass: "Employee",
          required: true,
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
          required: true,
        },
        salaryComponent: {
          type: "Pointer",
          targetClass: "SalaryComponent",
          required: true,
        },
        payrollDate: {
          type: "String",
          required: true,
        },
        name: {
          type: "String",
          required: true,
        },
        incentiveAmount: {
          type: "Number",
        },
        date: {
          type: "String",
        },
        payrollPeriod: {
          type: "String",
        },
        benefits: {
          type: "Array",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "LeavePeriod",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
          required: false,
        },
        fromDate: {
          type: "String",
          required: false,
        },
        toDate: {
          type: "String",
          required: false,
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
          required: false,
        },
        holiday: {
          type: "String",
          required: false,
        },
        isActive: {
          type: "Boolean",
        },
        holidayList: {
          type: "String",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "EmployeeBenefitClaim",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        employee: {
          type: "Pointer",
          targetClass: "Employee",
        },
        claimDate: {
          type: "String",
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
        },
        claimBenefitFor: {
          type: "String",
        },
        claimedAmount: {
          type: "String",
        },
        name: {
          type: "String",
        },
        attachments: {
          type: "Array",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "EmployeeBenefitApplication",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        employee: {
          type: "Pointer",
          targetClass: "Employee",
          required: true,
        },
        date: {
          type: "String",
          required: true,
        },
        payrollPeriod: {
          type: "Pointer",
          targetClass: "PayrollPeriod",
          required: true,
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
          required: true,
        },
        benefits: {
          type: "Array",
          required: false,
        },
        name: {
          type: "String",
          required: true,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "EmployeeOnboarding",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        jobApplicant: {
          type: "Pointer",
          targetClass: "JobApplicant",
          required: false,
        },
        jobOffer: {
          type: "Pointer",
          targetClass: "JobOffer",
          required: false,
        },
        employeeName: {
          type: "String",
          required: false,
        },
        dateOfJoining: {
          type: "Date",
          required: false,
        },
        status: {
          type: "String",
          required: false,
        },
        employeeOnboardingTemplate: {
          type: "Pointer",
          targetClass: "EmployeeOnboardingTemplate",
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
        },
        department: {
          type: "String",
        },
        designation: {
          type: "String",
        },
        employeeGrade: {
          type: "Pointer",
          targetClass: "EmployeeGrade",
        },
        series: {
          type: "String",
          required: false,
        },
        activities: {
          type: "Array",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "GrievanceType",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
          required: false,
        },
        description: {
          type: "String",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "DepartmentSelected",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "LeavePolicy",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        leaveAllocations: {
          type: "Array",
          required: false,
        },
        name: {
          type: "String",
          required: false,
        },
        status: {
          type: "String",
          required: false,
          defaultValue: "draft",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "LeavePolicyAssignment",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        employee: {
          type: "Pointer",
          targetClass: "Employee",
          required: false,
        },
        leavePeriod: {
          type: "Pointer",
          targetClass: "LeavePeriod",
          required: false,
        },
        effectiveFrom: {
          type: "String",
          required: false,
        },
        effectiveTo: {
          type: "String",
          required: false,
        },
        leavePolicy: {
          type: "Pointer",
          targetClass: "LeavePolicy",
          required: false,
        },
        addUnusedLeaves: {
          type: "Boolean",
          required: false,
        },
        status: {
          type: "String",
          required: false,
          defaultValue: "draft",
        },
        name: {
          type: "String",
          required: false,
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
          required: false,
          defaultValue: {
            __type: "Pointer",
            className: "Company",
            objectId: "i0JPXsRGQH",
          },
        },
        assignmentBasedOn: {
          type: "String",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "ShiftAssignment",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        shiftType: {
          type: "Pointer",
          targetClass: "ShiftType",
        },
        employee: {
          type: "Pointer",
          targetClass: "Employee",
        },
        status: {
          type: "String",
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
        },
        startDate: {
          type: "String",
        },
        endDate: {
          type: "String",
        },
        name: {
          type: "String",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "LeaveAllocation",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        series: {
          type: "String",
          required: false,
        },
        status: {
          type: "String",
          required: false,
          defaultValue: "draft",
        },
        employee: {
          type: "Pointer",
          targetClass: "Employee",
          required: false,
        },
        leaveType: {
          type: "Pointer",
          targetClass: "LeaveType",
          required: false,
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
          required: false,
          defaultValue: {
            __type: "Pointer",
            className: "Company",
            objectId: "i0JPXsRGQH",
          },
        },
        fromDate: {
          type: "String",
          required: false,
        },
        toDate: {
          type: "String",
          required: false,
        },
        newLeavesAllocated: {
          type: "String",
          required: false,
        },
        addUnusedLeaves: {
          type: "Boolean",
          required: false,
        },
        leavePolicyAssignment: {
          type: "Pointer",
          targetClass: "LeavePolicyAssignment",
          required: false,
        },
        description: {
          type: "String",
          required: false,
        },
        totalLeavesAllocated: {
          type: "Number",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "EmployeeSeparationTemplate",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
        },
        designation: {
          type: "String",
        },
        department: {
          type: "String",
        },
        employeeGrade: {
          type: "Pointer",
          targetClass: "EmployeeGrade",
        },
        series: {
          type: "String",
        },
        activities: {
          type: "Array",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "LeaveEncashment",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        leavePeriod: {
          type: "Pointer",
          targetClass: "LeavePeriod",
          required: false,
        },
        employee: {
          type: "Pointer",
          targetClass: "Employee",
          required: false,
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
          required: false,
        },
        leaveType: {
          type: "Pointer",
          targetClass: "LeaveType",
          required: false,
        },
        encashmentDate: {
          type: "String",
          required: false,
        },
        currency: {
          type: "String",
          required: false,
        },
        status: {
          type: "String",
          required: false,
          defaultValue: "draft",
        },
        name: {
          type: "String",
          required: false,
        },
        objectClassName: {
          type: "String",
          required: false,
          defaultValue: "LeaveEncashment",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "CompensatoryLeaveRequest",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
          required: false,
          defaultValue: "",
        },
        employee: {
          type: "Pointer",
          targetClass: "Employee",
          required: false,
        },
        leaveType: {
          type: "Pointer",
          targetClass: "LeaveType",
          required: false,
        },
        reason: {
          type: "String",
          required: false,
        },
        workFromDate: {
          type: "String",
          required: false,
        },
        workEndDate: {
          type: "String",
          required: false,
        },
        halfDay: {
          type: "Boolean",
          required: false,
        },
        halfDayDate: {
          type: "String",
          required: false,
        },
        status: {
          type: "String",
          required: false,
          defaultValue: "draft",
        },
        isHalfDay: {
          type: "Boolean",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "EmployeeSeparation",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        firstName: {
          type: "String",
        },
        designation: {
          type: "String",
        },
        department: {
          type: "String",
        },
        employee: {
          type: "Pointer",
          targetClass: "Employee",
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
        },
        status: {
          type: "String",
        },
        employeeSeparationTemplate: {
          type: "Pointer",
          targetClass: "EmployeeSeparationTemplate",
        },
        series: {
          type: "String",
        },
        exitInterviewSummary: {
          type: "String",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "ShiftRequest",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        shiftType: {
          type: "Pointer",
          targetClass: "ShiftType",
        },
        employee: {
          type: "Pointer",
          targetClass: "Employee",
        },
        status: {
          type: "String",
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
        },
        name: {
          type: "String",
        },
        fromDate: {
          type: "String",
        },
        toDate: {
          type: "String",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "EmployeeCheckin",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        employee: {
          type: "Pointer",
          targetClass: "Employee",
          required: false,
        },
        time: {
          type: "String",
          required: false,
        },
        name: {
          type: "String",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
    },
    {
      className: "EmployeeGrievance",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        subject: {
          type: "String",
        },
        raisedBy: {
          type: "Pointer",
          targetClass: "Employee",
        },
        date: {
          type: "Date",
        },
        status: {
          type: "String",
        },
        grievanceAgainstParty: {
          type: "String",
        },
        grievanceAgainst: {
          type: "String",
        },
        grievanceType: {
          type: "String",
        },
        associatedDocumentType: {
          type: "String",
        },
        associatedDocument: {
          type: "String",
        },
        description: {
          type: "String",
        },
        causeOfGrievance: {
          type: "String",
        },
        resolvedBy: {
          type: "String",
        },
        employeeResponsible: {
          type: "Pointer",
          targetClass: "Employee",
        },
        resolutionDetails: {
          type: "String",
        },
        series: {
          type: "String",
        },
        resolutionDate: {
          type: "String",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "ProjectType",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
        },
        description: {
          type: "String",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "EmployeeTransfer",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        employeeName: {
          type: "String",
        },
        department: {
          type: "String",
        },
        newEmployeeId: {
          type: "Boolean",
        },
        employee: {
          type: "Pointer",
          targetClass: "Employee",
        },
        transferDate: {
          type: "Date",
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
        },
        newCompany: {
          type: "String",
        },
        series: {
          type: "String",
        },
        status: {
          type: "String",
          required: false,
          defaultValue: "Submitted",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "User",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        fullName: {
          type: "String",
          required: false,
        },
        status: {
          type: "String",
          required: false,
          defaultValue: "Active",
        },
        name: {
          type: "String",
          required: false,
        },
        email: {
          type: "String",
          required: false,
        },
        firstName: {
          type: "String",
          required: false,
        },
        lastName: {
          type: "String",
          required: false,
        },
        sendWelcomeEmail: {
          type: "Boolean",
          required: false,
        },
        timeZone: {
          type: "String",
        },
        middleName: {
          type: "String",
        },
        username: {
          type: "String",
        },
        language: {
          type: "String",
        },
        userType: {
          type: "String",
          required: false,
          defaultValue: "System User",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "Project",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
          required: false,
        },
        estimatedCost: {
          type: "Number",
        },
        customer: {
          type: "Pointer",
          targetClass: "Customer",
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
        },
        projectType: {
          type: "Pointer",
          targetClass: "ProjectType",
        },
        projectName: {
          type: "String",
        },
        isCollectProgress: {
          type: "Boolean",
        },
        status: {
          type: "String",
        },
        fromTemplate: {
          type: "String",
        },
        expectedStartDate: {
          type: "String",
        },
        expectedEndDate: {
          type: "String",
        },
        priority: {
          type: "String",
        },
        department: {
          type: "String",
        },
        description: {
          type: "String",
        },
        completeMethod: {
          type: "String",
        },
        members: {
          type: "Array",
        },
        salesOrder: {
          type: "Pointer",
          targetClass: "Order",
        },
        isActive: {
          type: "Boolean",
        },
        holidayList: {
          type: "String",
        },
        frequencyToCollectProgress: {
          type: "String",
        },
        firstEmail: {
          type: "String",
        },
        secondEmail: {
          type: "String",
        },
        massage: {
          type: "String",
        },
        fromTime: {
          type: "String",
        },
        toTime: {
          type: "String",
        },
        timetoSendDaily: {
          type: "String",
        },
        daytoSend: {
          type: "String",
        },
        timetoSendWeekly: {
          type: "String",
        },
        costCenterList: {
          type: "Pointer",
          targetClass: "CostCenter",
        },
        defaultCostCenter: {
          type: "Pointer",
          targetClass: "CostCenter",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "AttendanceRequest",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        employee: {
          type: "Pointer",
          targetClass: "Employee",
          required: false,
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
          required: false,
        },
        series: {
          type: "String",
          required: false,
        },
        explanation: {
          type: "String",
          required: false,
        },
        fromDate: {
          type: "Date",
          required: false,
        },
        halfDayDate: {
          type: "Date",
          required: false,
        },
        reason: {
          type: "String",
          required: false,
        },
        toDate: {
          type: "Date",
        },
        halfDay: {
          type: "Boolean",
        },
        status: {
          type: "String",
          required: false,
          defaultValue: "Submitted",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "ExpenseClaim",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        status: {
          type: "String",
          required: false,
          defaultValue: "Draft",
        },
        employee: {
          type: "Pointer",
          targetClass: "Employee",
          required: false,
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
          required: false,
        },
        grievanceType: {
          type: "Pointer",
          targetClass: "GrievanceType",
          required: false,
        },
        costCenter: {
          type: "Pointer",
          targetClass: "CostCenter",
          required: false,
        },
        series: {
          type: "String",
          required: false,
        },
        isPaid: {
          type: "Boolean",
        },
        expenseApprover: {
          type: "String",
        },
        approvalStatus: {
          type: "String",
        },
        postingDate: {
          type: "String",
        },
        task: {
          type: "String",
        },
        remark: {
          type: "String",
        },
        clearanceDate: {
          type: "String",
        },
        account: {
          type: "String",
        },
        project: {
          type: "String",
        },
        expenses: {
          type: "Array",
        },
        expensesTaxes: {
          type: "Array",
        },
        advances: {
          type: "Array",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "Task",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        subject: {
          type: "String",
          required: true,
        },
        color: {
          type: "String",
          required: false,
        },
        priority: {
          type: "String",
          required: true,
        },
        weight: {
          type: "Number",
          required: false,
        },
        parentTask: {
          type: "Pointer",
          targetClass: "Task",
          required: false,
        },
        description: {
          type: "String",
          required: false,
        },
        name: {
          type: "String",
          required: true,
        },
        expectedStartDate: {
          type: "String",
          required: false,
        },
        expectedEndDate: {
          type: "String",
          required: false,
        },
        expectedTime: {
          type: "Number",
          required: false,
        },
        progress: {
          type: "Number",
          required: false,
        },
        beginOn: {
          type: "Number",
          required: false,
        },
        duration: {
          type: "Number",
          required: false,
        },
        completedOn: {
          type: "String",
          required: false,
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
          required: false,
        },
        department: {
          type: "Pointer",
          targetClass: "Department",
          required: false,
        },
        isGroup: {
          type: "Boolean",
        },
        isTemplate: {
          type: "Boolean",
        },
        project: {
          type: "Pointer",
          targetClass: "Project",
          required: false,
        },
        isMilestone: {
          type: "Boolean",
        },
        issue: {
          type: "Pointer",
          targetClass: "Issue",
          required: false,
        },
        completedBy: {
          type: "Pointer",
          targetClass: "_User",
          required: false,
        },
        status: {
          type: "String",
          required: false,
        },
        dependencies: {
          type: "Array",
          required: false,
        },
        order: {
          type: "Number",
          required: false,
        },
        type: {
          type: "Pointer",
          targetClass: "TaskType",
          required: false,
        },
        assigner: {
          type: "Pointer",
          targetClass: "_User",
          required: false,
        },
        assignees: {
          type: "Array",
          required: false,
        },
        attachments: {
          type: "Array",
          required: false,
        },
        tags: {
          type: "Array",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "EmployeeAdvance",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        series: {
          type: "String",
          required: false,
        },
        postingDate: {
          type: "String",
          required: false,
        },
        isRepay: {
          type: "Boolean",
          required: false,
        },
        employee: {
          type: "Pointer",
          targetClass: "Employee",
          required: false,
        },
        currency: {
          type: "String",
          required: false,
        },
        purpose: {
          type: "String",
          required: false,
        },
        advanceAmount: {
          type: "String",
          required: false,
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
          required: false,
        },
        paymentMode: {
          type: "String",
          required: false,
        },
        advanceAccount: {
          type: "String",
          required: false,
        },
        status: {
          type: "String",
          required: false,
          defaultValue: "Draft",
        },
        objectClassName: {
          type: "String",
          required: false,
          defaultValue: "EmployeeAdvance",
        },
        account: {
          type: "String",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "ShiftType",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
        },
        startTime: {
          type: "String",
        },
        endTime: {
          type: "String",
        },
        holiday: {
          type: "String",
        },
        determineCheckinandCheckout: {
          type: "String",
        },
        workingHoursThresholdForHalfDay: {
          type: "String",
        },
        workingHoursCalculationBasedOn: {
          type: "String",
        },
        workingHoursThresholdforAbsent: {
          type: "String",
        },
        beginCheckinBeforeShiftStartTime: {
          type: "String",
        },
        allowCheckOutAfterShiftEndTime: {
          type: "String",
        },
        earlyExitGracePeriod: {
          type: "String",
        },
        lateEntryGracePeriod: {
          type: "String",
        },
        enableAutoAttendance: {
          type: "Boolean",
        },
        enableEntry: {
          type: "Boolean",
        },
        enableExit: {
          type: "Boolean",
        },
        processAttendanceAfter: {
          type: "String",
        },
        lastSyncOfCheckin: {
          type: "String",
        },
        workingDays: {
          type: "Array",
        },
        breakTimes: {
          type: "Array",
        },
        dataItem: {
          type: "Object",
        },
        dataId: {
          type: "String",
        },
        holidayList: {
          type: "Pointer",
          targetClass: "HolidayList",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "TravelRequest",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
          required: false,
        },
        status: {
          type: "String",
          required: false,
          defaultValue: "Draft",
        },
        travelType: {
          type: "String",
          required: false,
        },
        travelPurpose: {
          type: "String",
          required: false,
        },
        employee: {
          type: "Pointer",
          targetClass: "Employee",
          required: false,
        },
        travelFunding: {
          type: "String",
          required: false,
        },
        sponsorDetails: {
          type: "String",
          required: false,
        },
        identificationDocumentType: {
          type: "String",
          required: false,
        },
        identificationDocumentNumber: {
          type: "String",
          required: false,
        },
        passportNumber: {
          type: "String",
          required: false,
        },
        contactNumber: {
          type: "String",
          required: false,
        },
        contactEmail: {
          type: "String",
          required: false,
        },
        travelItinerary: {
          type: "Array",
          required: false,
        },
        costingDetails: {
          type: "Array",
          required: false,
        },
        costCenter: {
          type: "Pointer",
          targetClass: "CostCenter",
          required: false,
        },
        grievanceType: {
          type: "Pointer",
          targetClass: "GrievanceType",
          required: false,
        },
        description: {
          type: "String",
          required: false,
        },
        organizerName: {
          type: "String",
          required: false,
        },
        organizerAddress: {
          type: "String",
          required: false,
        },
        otherDetails: {
          type: "String",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "Product",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
          required: false,
        },
        buyingPrice: {
          type: "Number",
          required: false,
        },
        sellingPrice: {
          type: "Number",
          required: false,
        },
        description: {
          type: "String",
          required: false,
        },
        status: {
          type: "String",
          required: false,
          defaultValue: "Available",
        },
        branch: {
          type: "Pointer",
          targetClass: "Branch",
        },
        attributes: {
          type: "String",
          required: false,
        },
        objectClassName: {
          type: "String",
          required: false,
          defaultValue: "Product",
        },
        count: {
          type: "Number",
          required: false,
        },
        brand: {
          type: "Pointer",
          targetClass: "Brand",
          required: false,
        },
        category: {
          type: "Pointer",
          targetClass: "Category",
          required: false,
        },
        productId: {
          type: "String",
          required: false,
        },
        image: {
          type: "File",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "TrainingProgram",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        trainingProgram: {
          type: "String",
          required: false,
        },
        status: {
          type: "String",
          required: false,
        },
        trainerName: {
          type: "String",
          required: false,
        },
        trainerEmail: {
          type: "String",
          required: false,
        },
        supplier: {
          type: "String",
          required: false,
        },
        contactNumber: {
          type: "String",
          required: false,
        },
        description: {
          type: "String",
          required: false,
        },
        trainingprogram: {
          type: "String",
        },
        trainingName: {
          type: "String",
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
          required: false,
        },
        notes: {
          type: "String",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "Order",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        total: {
          type: "Number",
          required: false,
        },
        paymentMethod: {
          type: "String",
          required: false,
        },
        customer: {
          type: "Pointer",
          targetClass: "Customer",
          required: false,
        },
        status: {
          type: "String",
          required: false,
          defaultValue: "Pending",
        },
        receivingType: {
          type: "String",
        },
        note: {
          type: "String",
        },
        objectClassName: {
          type: "String",
          required: false,
          defaultValue: "Order",
        },
        orderItems: {
          type: "Array",
        },
        shippingFee: {
          type: "Number",
          required: false,
        },
        code: {
          type: "String",
          required: false,
        },
        delivery: {
          type: "Object",
          required: false,
        },
        originalTotal: {
          type: "Number",
        },
        isActive: {
          type: "String",
          required: false,
        },
        vouchers: {
          type: "Array",
        },
        voucherDiscount: {
          type: "Number",
        },
        promotionDiscount: {
          type: "Number",
        },
        totalQuantity: {
          type: "Number",
        },
        date: {
          type: "String",
        },
        shippingDate: {
          type: "String",
        },
        receivingDate: {
          type: "String",
        },
        subTotal: {
          type: "Number",
        },
        subtotal: {
          type: "Number",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "OrderItem",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        product: {
          type: "Pointer",
          targetClass: "Product",
          required: false,
        },
        order: {
          type: "Pointer",
          targetClass: "Order",
          required: false,
        },
        total: {
          type: "Number",
          required: false,
        },
        quantity: {
          type: "Number",
          required: false,
        },
        name: {
          type: "String",
          required: false,
          defaultValue: "",
        },
        note: {
          type: "String",
        },
        price: {
          type: "Number",
        },
        promotionPrice: {
          type: "Number",
        },
        promotionDiscount: {
          type: "Number",
        },
        promotion: {
          type: "Pointer",
          targetClass: "PromotionTest",
        },
        productId: {
          type: "String",
        },
        customer: {
          type: "Pointer",
          targetClass: "Customer",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "Transaction",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        order: {
          type: "Pointer",
          targetClass: "Order",
          required: false,
        },
        source: {
          type: "Pointer",
          targetClass: "Account",
          required: false,
        },
        target: {
          type: "Pointer",
          targetClass: "Account",
          required: false,
        },
        type: {
          type: "String",
          required: false,
        },
        amount: {
          type: "Number",
          required: false,
        },
        balance: {
          type: "Number",
          required: false,
        },
        customer: {
          type: "Pointer",
          targetClass: "Customer",
          required: false,
        },
        status: {
          type: "String",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "MyClass",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
        },
        age: {
          type: "Number",
        },
        date: {
          type: "String",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "Issue",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        subject: {
          type: "String",
          required: false,
        },
        status: {
          type: "String",
          required: false,
        },
        priority: {
          type: "String",
          required: false,
        },
        name: {
          type: "String",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "TrainingEvent",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        eventName: {
          type: "String",
          required: false,
        },
        type: {
          type: "String",
          required: false,
        },
        level: {
          type: "String",
          required: false,
        },
        trainerName: {
          type: "String",
          required: false,
        },
        trainerEmail: {
          type: "String",
          required: false,
        },
        contactNumber: {
          type: "String",
          required: false,
        },
        course: {
          type: "String",
          required: false,
        },
        location: {
          type: "String",
          required: false,
        },
        introduction: {
          type: "String",
          required: false,
        },
        startTime: {
          type: "String",
          required: false,
        },
        endTime: {
          type: "String",
          required: false,
        },
        code: {
          type: "Number",
        },
        error: {
          type: "String",
        },
        eventStatus: {
          type: "String",
        },
        attendees: {
          type: "Array",
        },
        status: {
          type: "String",
          required: false,
          defaultValue: "Draft",
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
          required: false,
        },
        trainingProgram: {
          type: "Pointer",
          targetClass: "TrainingProgram",
          required: false,
        },
        supplier: {
          type: "Pointer",
          targetClass: "Supplier",
          required: false,
        },
        name: {
          type: "String",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "Item",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
          required: false,
        },
        itemCode: {
          type: "String",
          required: false,
        },
        defaultUnitOfMeasure: {
          type: "String",
        },
        isItemFromHub: {
          type: "Boolean",
        },
        disabled: {
          type: "Boolean",
        },
        allowAlternativeItem: {
          type: "Boolean",
        },
        maintainStock: {
          type: "Boolean",
        },
        includeItemInManufacturing: {
          type: "Boolean",
        },
        isFixedAsset: {
          type: "Boolean",
        },
        autoCreateAssetsOnPurchase: {
          type: "Boolean",
        },
        isItemfromHub: {
          type: "Boolean",
        },
        itemName: {
          type: "String",
        },
        openingStock: {
          type: "String",
        },
        valuationRate: {
          type: "String",
        },
        standardSellingRate: {
          type: "String",
        },
        itemGroup: {
          type: "Pointer",
          targetClass: "ItemGroup",
        },
        assetCategory: {
          type: "Pointer",
          targetClass: "AssetCategory",
        },
        assetNamingSeries: {
          type: "String",
        },
        brand: {
          type: "Pointer",
          targetClass: "Brand",
          required: false,
        },
        description: {
          type: "String",
        },
        barcodes: {
          type: "Array",
        },
        shelfLifeInDays: {
          type: "String",
        },
        endOfLife: {
          type: "String",
        },
        defaultMaterialRequestType: {
          type: "String",
        },
        valuationMethod: {
          type: "String",
        },
        warrantyPeriod: {
          type: "String",
        },
        weightPerUnit: {
          type: "String",
        },
        weightUOM: {
          type: "String",
        },
        itemAttribute: {
          type: "Array",
          required: false,
        },
        hasVariants: {
          type: "Boolean",
        },
        itemCompany: {
          type: "Array",
        },
        isActive: {
          type: "Boolean",
          required: false,
        },
        image: {
          type: "File",
          required: false,
        },
        price: {
          type: "Number",
          required: false,
        },
        username: {
          type: "String",
        },
        password: {
          type: "String",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "ItemAlternative",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        itemCode: {
          type: "String",
        },
        alternativeItemCode: {
          type: "String",
        },
        itemName: {
          type: "String",
        },
        alternativeItemName: {
          type: "String",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "CustomsTariffNumber",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        tariffNumber: {
          type: "String",
        },
        description: {
          type: "String",
        },
        addAComment: {
          type: "String",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "ItemGroup",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
          required: false,
        },
        username: {
          type: "String",
        },
        password: {
          type: "String",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "AssetCategory",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "Notification",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        title: {
          type: "String",
          required: false,
        },
        sentNotifications: {
          type: "Number",
          required: false,
        },
        notificationReadingRate: {
          type: "Number",
          required: false,
        },
        sentTime: {
          type: "String",
          required: false,
        },
        receiveUsers: {
          type: "Array",
          required: false,
          defaultValue: [],
        },
        content: {
          type: "String",
        },
        shortTitle: {
          type: "String",
        },
        status: {
          type: "String",
          required: false,
          defaultValue: "sent",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "Discount",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        series: {
          type: "String",
        },
        itemCode: {
          type: "Pointer",
          targetClass: "Item",
        },
        itemGroup: {
          type: "String",
        },
        disable: {
          type: "Boolean",
        },
        mixedCondition: {
          type: "Boolean",
        },
        isCumulative: {
          type: "Boolean",
        },
        selling: {
          type: "Boolean",
        },
        buying: {
          type: "Boolean",
        },
        name: {
          type: "String",
        },
        applyOn: {
          type: "String",
        },
        applyRuleOnOther: {
          type: "String",
        },
        validFrom: {
          type: "String",
        },
        validUpto: {
          type: "String",
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
        },
        currency: {
          type: "String",
        },
        applicableFor: {
          type: "String",
        },
        image: {
          type: "String",
        },
        priceDiscountSlabs: {
          type: "Array",
        },
        productDiscountSlabs: {
          type: "Array",
        },
        pricingRule: {
          type: "Array",
        },
        applicableForSelected: {
          type: "String",
        },
        brand: {
          type: "Pointer",
          targetClass: "Brand",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "MaterialRequest",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        series: {
          type: "String",
          required: false,
        },
        isCollectProgress: {
          type: "Boolean",
        },
        transactionDate: {
          type: "String",
        },
        purpose: {
          type: "String",
        },
        requiredBy: {
          type: "String",
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
        },
        targetWarehouse: {
          type: "String",
        },
        scanBarcode: {
          type: "String",
        },
        description: {
          type: "String",
        },
        letterHead: {
          type: "String",
        },
        printHeading: {
          type: "String",
        },
        terms: {
          type: "String",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "ItemManufacturer",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        iconCode: {
          type: "String",
        },
        manufacturer: {
          type: "String",
        },
        manufacturerPartNumber: {
          type: "String",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "Voucher",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        displayApp: {
          type: "String",
        },
        subjectOfApplication: {
          type: "String",
        },
        type: {
          type: "String",
        },
        name: {
          type: "String",
        },
        description: {
          type: "String",
        },
        series: {
          type: "String",
        },
        budget: {
          type: "Number",
          required: false,
          defaultValue: 1000000,
        },
        percent: {
          type: "Number",
          required: false,
          defaultValue: 10,
        },
        priceAbove: {
          type: "Number",
          required: false,
        },
        fixed: {
          type: "Number",
          required: false,
        },
        maxRedemption: {
          type: "Number",
          required: false,
        },
        ortherPromotions: {
          type: "Boolean",
          required: false,
          defaultValue: true,
        },
        isStackable: {
          type: "Boolean",
          required: false,
          defaultValue: true,
        },
        products: {
          type: "Array",
          required: false,
        },
        brands: {
          type: "Array",
          required: false,
        },
        categories: {
          type: "Array",
          required: false,
        },
        branch: {
          type: "Pointer",
          targetClass: "Branch",
        },
        startDate: {
          type: "String",
          required: false,
        },
        endDate: {
          type: "String",
          required: false,
        },
        maxRedemptionPerCustomer: {
          type: "Number",
          required: false,
        },
        maxDiscount: {
          type: "Number",
          required: false,
        },
        stackable: {
          type: "Boolean",
        },
        ortherPromotion: {
          type: "Boolean",
        },
        applyOn: {
          type: "String",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "Brand",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
          required: false,
        },
        thumbnail: {
          type: "File",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "TaskType",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
          required: true,
        },
        weight: {
          type: "Number",
          required: false,
        },
        description: {
          type: "String",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "WareHouse",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        isGroup: {
          type: "Boolean",
        },
        disabled: {
          type: "Boolean",
        },
        parentWarehouse: {
          type: "String",
        },
        defaultInTransitWarehouse: {
          type: "String",
        },
        warehouseName: {
          type: "String",
        },
        phoneNo: {
          type: "String",
        },
        addressLine1: {
          type: "String",
        },
        addressLine2: {
          type: "String",
        },
        city: {
          type: "String",
        },
        state: {
          type: "String",
        },
        pin: {
          type: "String",
        },
        name: {
          type: "String",
        },
        warehouseType: {
          type: "String",
        },
        account: {
          type: "String",
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "File",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        fileName: {
          type: "String",
          required: false,
        },
        createdBy: {
          type: "Pointer",
          targetClass: "_User",
          required: false,
        },
        fileSize: {
          type: "Number",
          required: false,
        },
        isFolder: {
          type: "Boolean",
          required: false,
        },
        parent: {
          type: "Pointer",
          targetClass: "File",
          required: false,
        },
        fileType: {
          type: "String",
          required: false,
        },
        originalImageUrl: {
          type: "String",
        },
        thumbnailImageUrl: {
          type: "String",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "SerialNo",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        company: {
          type: "String",
        },
        serialNo: {
          type: "String",
        },
        itemCode: {
          type: "String",
        },
        salesOrder: {
          type: "String",
        },
        supplier: {
          type: "String",
        },
        customer: {
          type: "String",
        },
        warrantyExpiryDate: {
          type: "String",
        },
        amcExpiryDate: {
          type: "String",
        },
        workOrder: {
          type: "String",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "Batch",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        batchUom: {
          type: "String",
        },
        batchId: {
          type: "String",
        },
        item: {
          type: "String",
        },
        manufacturingDate: {
          type: "String",
        },
        expiryDate: {
          type: "String",
        },
        batchDescription: {
          type: "String",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "Quotation",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
          required: false,
        },
        status: {
          type: "String",
          required: false,
          defaultValue: "Draft",
        },
        date: {
          type: "String",
          required: false,
        },
        grandTotal: {
          type: "Number",
          required: false,
        },
        customer: {
          type: "Pointer",
          targetClass: "Customer",
          required: false,
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
          required: false,
        },
        validTill: {
          type: "String",
        },
        orderType: {
          type: "String",
        },
        applyAdditionalDiscountOn: {
          type: "String",
        },
        groupSameItems: {
          type: "Boolean",
        },
        ignorePricingRule: {
          type: "Boolean",
        },
        quotationTo: {
          type: "String",
        },
        taxCategory: {
          type: "String",
        },
        shippingRule: {
          type: "String",
        },
        salesTaxesAndChargesTemplate: {
          type: "String",
        },
        paymentTermsTemplate: {
          type: "String",
        },
        currency: {
          type: "String",
        },
        priceList: {
          type: "String",
        },
        items: {
          type: "Array",
        },
        paymentSchedule: {
          type: "Array",
        },
        salesTaxesAndCharges: {
          type: "Array",
        },
        lead: {
          type: "Pointer",
          targetClass: "Lead",
        },
        couponCode: {
          type: "String",
        },
        referralSalesPartner: {
          type: "String",
        },
        additionalDiscountPercentage: {
          type: "String",
        },
        additionalDiscountAmount: {
          type: "String",
        },
        termDetails: {
          type: "String",
        },
        terms: {
          type: "Pointer",
          targetClass: "TermAndCondition",
        },
        letterHead: {
          type: "String",
        },
        printHeading: {
          type: "String",
        },
        campaign: {
          type: "String",
        },
        leadSource: {
          type: "String",
        },
        supplierQuotation: {
          type: "String",
        },
        title: {
          type: "String",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "InstallationNote",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        status: {
          type: "String",
        },
        installationDate: {
          type: "String",
        },
        installationTime: {
          type: "String",
        },
        company: {
          type: "String",
        },
        customer: {
          type: "String",
        },
        remarks: {
          type: "String",
        },
        series: {
          type: "String",
        },
        batchUom: {
          type: "String",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "ItemAttribute",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        numericValues: {
          type: "Boolean",
        },
        attributeName: {
          type: "String",
        },
        fromRange: {
          type: "String",
        },
        increment: {
          type: "String",
        },
        toRange: {
          type: "String",
        },
        name: {
          type: "String",
        },
        error: {
          type: "String",
        },
        code: {
          type: "Number",
        },
        itemAttributeValues: {
          type: "Array",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "HrSetting",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        stopBirthdayReminders: {
          type: "Boolean",
        },
        expenseApproverMandatory: {
          type: "Boolean",
        },
        retirementAge: {
          type: "String",
        },
        createdBy: {
          type: "String",
        },
        standardWorkingHours: {
          type: "String",
        },
        leaveApprovalNotificationTemplate: {
          type: "Pointer",
          targetClass: "EmailTemplate",
        },
        leaveStatusNotificationTemplate: {
          type: "Pointer",
          targetClass: "EmailTemplate",
        },
        userName: {
          type: "String",
        },
        sendLeaveNotification: {
          type: "Boolean",
        },
        leaveApproverMandatory: {
          type: "Boolean",
        },
        showLeaves: {
          type: "Boolean",
        },
        autoLeaveEncashment: {
          type: "Boolean",
        },
        restrictBackdatedLeaveApplication: {
          type: "Boolean",
        },
        roleAllowedtoCreateBackdatedLeaveApplication: {
          type: "String",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "EmailTemplate",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
          required: false,
        },
        subject: {
          type: "String",
          required: false,
        },
        response: {
          type: "String",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "PriceList",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        enabled: {
          type: "Boolean",
        },
        buying: {
          type: "Boolean",
        },
        selling: {
          type: "Boolean",
        },
        priceNotUOMDependent: {
          type: "Boolean",
        },
        priceListName: {
          type: "String",
        },
        currency: {
          type: "String",
        },
        itemCountry: {
          type: "Array",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "SalesOrder",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        customer: {
          type: "Pointer",
          targetClass: "Customer",
          required: false,
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
          required: false,
        },
        date: {
          type: "String",
          required: false,
        },
        deliveryDate: {
          type: "String",
          required: false,
        },
        orderType: {
          type: "String",
          required: false,
        },
        name: {
          type: "String",
          required: false,
        },
        grandTotal: {
          type: "Number",
          required: false,
        },
        territory: {
          type: "Pointer",
          targetClass: "Territory",
        },
        currency: {
          type: "String",
        },
        applyAdditionalDiscountOn: {
          type: "String",
        },
        groupSameItems: {
          type: "Boolean",
        },
        isInternalCustomer: {
          type: "Boolean",
        },
        ignorePricingRule: {
          type: "Boolean",
        },
        customerPurchaseOrder: {
          type: "String",
        },
        taxCategory: {
          type: "String",
        },
        shippingRule: {
          type: "String",
        },
        salesTaxesAndChargesTemplate: {
          type: "String",
        },
        paymentTermsTemplate: {
          type: "String",
        },
        items: {
          type: "Array",
        },
        salesTaxesAndCharges: {
          type: "Array",
        },
        paymentSchedule: {
          type: "Array",
        },
        salesTeam: {
          type: "Array",
        },
        status: {
          type: "String",
          required: false,
          defaultValue: "Draft",
        },
        customerAddress: {
          type: "Pointer",
          targetClass: "Address",
        },
        contactPerson: {
          type: "Pointer",
          targetClass: "Contact",
        },
        companyAddressName: {
          type: "Pointer",
          targetClass: "Address",
        },
        shippingAddressName: {
          type: "Pointer",
          targetClass: "Address",
        },
        couponCode: {
          type: "String",
        },
        additionalDiscountPercentage: {
          type: "String",
        },
        additionalDiscountAmount: {
          type: "String",
        },
        terms: {
          type: "String",
        },
        project: {
          type: "String",
        },
        source: {
          type: "String",
        },
        campaign: {
          type: "String",
        },
        letterHead: {
          type: "String",
        },
        printHeading: {
          type: "String",
        },
        salesPartner: {
          type: "String",
        },
        commissionRate: {
          type: "String",
        },
        totalCommission: {
          type: "String",
        },
        fromDate: {
          type: "String",
        },
        toDate: {
          type: "String",
        },
        autoRepeat: {
          type: "String",
        },
        termDetails: {
          type: "String",
        },
        priceList: {
          type: "Pointer",
          targetClass: "PriceList",
          required: false,
        },
        sourceWarehouse: {
          type: "Pointer",
          targetClass: "WareHouse",
        },
      },
      classLevelPermissions: {
        find: {
          "role:Test": true,
          requiresAuthentication: true,
          "*": true,
        },
        count: {
          "role:Test": true,
          requiresAuthentication: true,
          "*": true,
        },
        get: {
          "role:Test": true,
          requiresAuthentication: true,
          "*": true,
        },
        create: {
          "role:Test": true,
        },
        update: {
          "role:Test": true,
        },
        delete: {
          "role:Test": true,
        },
        addField: {
          "role:Test": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "Timesheet",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        exchangeRate: {
          type: "Number",
        },
        employee: {
          type: "Pointer",
          targetClass: "Employee",
        },
        project: {
          type: "Pointer",
          targetClass: "Project",
        },
        customer: {
          type: "Pointer",
          targetClass: "Customer",
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
        },
        assetNamingSeries: {
          type: "String",
        },
        currency: {
          type: "String",
        },
        status: {
          type: "String",
        },
        description: {
          type: "String",
        },
        timeSheets: {
          type: "Array",
        },
        series: {
          type: "String",
        },
        totalBillableHour: {
          type: "String",
        },
        totalBillableAmount: {
          type: "String",
        },
        totalCostingAmount: {
          type: "String",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "Redemption",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        customer: {
          type: "Pointer",
          targetClass: "Customer",
        },
        order: {
          type: "Pointer",
          targetClass: "Order",
        },
        voucher: {
          type: "Pointer",
          targetClass: "Voucher",
        },
        voucherDiscount: {
          type: "Number",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "Address",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
          required: false,
        },
        status: {
          type: "String",
          required: false,
          defaultValue: "Enabled",
        },
        addressType: {
          type: "String",
          required: false,
        },
        cityTown: {
          type: "String",
          required: false,
        },
        addressTitle: {
          type: "String",
          required: false,
        },
        addressLine1: {
          type: "String",
          required: false,
        },
        addressLine2: {
          type: "String",
          required: false,
        },
        county: {
          type: "String",
          required: false,
        },
        stateProvince: {
          type: "String",
          required: false,
        },
        country: {
          type: "String",
          required: false,
        },
        postalCode: {
          type: "String",
          required: false,
        },
        emailAddress: {
          type: "String",
          required: false,
        },
        phone: {
          type: "String",
          required: false,
        },
        fax: {
          type: "String",
          required: false,
        },
        taxCategory: {
          type: "String",
          required: false,
        },
        preferredBillingAddress: {
          type: "Boolean",
          required: false,
        },
        disabled: {
          type: "Boolean",
          required: false,
        },
        preferredShippingAddress: {
          type: "Boolean",
          required: false,
        },
        links: {
          type: "Array",
          required: false,
        },
        preferredShppingAddress: {
          type: "Boolean",
        },
        isYourCompanyAddress: {
          type: "Boolean",
        },
        ward: {
          type: "String",
          required: false,
        },
        street: {
          type: "String",
          required: false,
        },
        distric: {
          type: "String",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
          requiresAuthentication: true,
        },
        count: {
          "*": true,
          requiresAuthentication: true,
        },
        get: {
          "*": true,
          requiresAuthentication: true,
        },
        create: {
          "*": true,
          requiresAuthentication: true,
        },
        update: {
          "*": true,
          requiresAuthentication: true,
        },
        delete: {
          "*": true,
          requiresAuthentication: true,
        },
        addField: {
          "*": true,
          requiresAuthentication: true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "Promotion",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        itemGroup: {
          type: "String",
        },
        brand: {
          type: "Pointer",
          targetClass: "Brand",
        },
        disable: {
          type: "Boolean",
        },
        mixedCondition: {
          type: "Boolean",
        },
        isCumulative: {
          type: "Boolean",
        },
        selling: {
          type: "Boolean",
        },
        buying: {
          type: "Boolean",
        },
        name: {
          type: "String",
        },
        applyOn: {
          type: "String",
        },
        applyRuleOnOther: {
          type: "String",
        },
        validFrom: {
          type: "String",
        },
        validUpto: {
          type: "String",
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
        },
        currency: {
          type: "String",
        },
        applicableFor: {
          type: "String",
        },
        applicableForSelected: {
          type: "String",
        },
        series: {
          type: "String",
        },
        image: {
          type: "String",
        },
        priceDiscountSlabs: {
          type: "Array",
        },
        productDiscountSlabs: {
          type: "Array",
        },
        pricingRule: {
          type: "Array",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "ActivityType",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        defaultBillingRate: {
          type: "Number",
        },
        defaultCostingRate: {
          type: "Number",
        },
        name: {
          type: "String",
        },
        disabled: {
          type: "Boolean",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "ActivityCost",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        employee: {
          type: "Pointer",
          targetClass: "Employee",
        },
        costingRate: {
          type: "Number",
        },
        billingRate: {
          type: "Number",
        },
        activityType: {
          type: "Pointer",
          targetClass: "ActivityType",
        },
        name: {
          type: "String",
        },
        title: {
          type: "String",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "TaxWithholdingCategory",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
          required: false,
        },
        categoryName: {
          type: "String",
          required: false,
        },
        rates: {
          type: "Array",
          required: false,
        },
        accounts: {
          type: "Array",
          required: false,
        },
        objectClassName: {
          type: "String",
          required: false,
          defaultValue: "TaxWithholdingCategory",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "Contract",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        startDate: {
          type: "Date",
          required: false,
        },
        endDate: {
          type: "Date",
          required: false,
        },
        employee: {
          type: "Pointer",
          targetClass: "Employee",
          required: false,
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
          required: false,
        },
        name: {
          type: "String",
          required: false,
        },
        order: {
          type: "Pointer",
          targetClass: "Order",
          required: false,
        },
        code: {
          type: "String",
          required: true,
        },
        isActive: {
          type: "Boolean",
          required: false,
        },
        type: {
          type: "String",
          required: false,
        },
        attachment: {
          type: "File",
          required: false,
        },
        partyUser: {
          type: "Pointer",
          targetClass: "_User",
        },
        partyType: {
          type: "String",
        },
        signee: {
          type: "String",
        },
        signedOn: {
          type: "String",
        },
        fulfilmentDeadline: {
          type: "String",
        },
        contractTerms: {
          type: "String",
        },
        partyNameCustomer: {
          type: "Pointer",
          targetClass: "Customer",
        },
        partyNameSupplier: {
          type: "Pointer",
          targetClass: "Supplier",
        },
        contractTemplate: {
          type: "String",
        },
        documentType: {
          type: "String",
        },
        documentName: {
          type: "String",
        },
        partyNameEmployee: {
          type: "Pointer",
          targetClass: "Employee",
        },
        totalValue: {
          type: "Number",
          required: false,
        },
        paidAmount: {
          type: "Number",
          required: false,
        },
        noPeriods: {
          type: "Number",
          required: false,
        },
        rateValue: {
          type: "Number",
          required: false,
        },
        noPaidPeriods: {
          type: "Number",
          required: false,
        },
        customer: {
          type: "Pointer",
          targetClass: "Customer",
          required: false,
        },
        periodPaidAmount: {
          type: "Number",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "Post",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        title: {
          type: "String",
          required: false,
        },
        content: {
          type: "String",
          required: false,
        },
        status: {
          type: "String",
          required: false,
        },
        thumbnail: {
          type: "File",
          required: false,
        },
        countView: {
          type: "String",
          required: false,
        },
        series: {
          type: "String",
          required: false,
        },
        createdBy: {
          type: "Pointer",
          targetClass: "_User",
          required: false,
        },
        tags: {
          type: "Array",
          required: false,
        },
        name: {
          type: "String",
        },
        category: {
          type: "Pointer",
          targetClass: "SysCfg",
          required: false,
        },
        isFeatured: {
          type: "Boolean",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "ShoppingCart",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        items: {
          type: "Array",
          required: false,
        },
        total: {
          type: "Number",
          required: false,
        },
        originalTotal: {
          type: "Number",
          required: false,
        },
        customer: {
          type: "Pointer",
          targetClass: "Customer",
          required: false,
        },
        voucherDiscount: {
          type: "Number",
        },
        promotionDiscount: {
          type: "Number",
        },
        vouchers: {
          type: "Array",
        },
        quantity: {
          type: "Number",
        },
        subtotal: {
          type: "Number",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "Appraisal",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        series: {
          type: "String",
        },
        appraisalTemplate: {
          type: "Pointer",
          targetClass: "AppraisalTemplate",
        },
        status: {
          type: "String",
        },
        startDate: {
          type: "String",
        },
        endDate: {
          type: "String",
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
        },
        employee: {
          type: "Pointer",
          targetClass: "Employee",
        },
        remarks: {
          type: "String",
        },
        goals: {
          type: "Array",
        },
        referenceDocumentType: {
          type: "String",
        },
        ruleName: {
          type: "String",
        },
        points: {
          type: "Number",
        },
        enabled: {
          type: "Boolean",
        },
        allotPointsToAssignedUsers: {
          type: "Boolean",
        },
        applyOnlyOnce: {
          type: "Boolean",
        },
        forDocumentEvent: {
          type: "String",
        },
        userField: {
          type: "String",
        },
        multiplierField: {
          type: "String",
        },
        condition: {
          type: "String",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "AppraisalTemplate",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
          required: false,
        },
        description: {
          type: "String",
        },
        goals: {
          type: "Array",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "Tag",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
          required: false,
        },
        tagId: {
          type: "String",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "DailyWorkSummaryGroup",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        enable: {
          type: "Boolean",
        },
        name: {
          type: "String",
        },
        sendEmailsAt: {
          type: "String",
        },
        holidayList: {
          type: "String",
        },
        subject: {
          type: "String",
        },
        series: {
          type: "String",
        },
        content: {
          type: "String",
        },
        users: {
          type: "Array",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "EnergyPointRule",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        referenceDocumentType: {
          type: "String",
        },
        ruleName: {
          type: "String",
        },
        points: {
          type: "Number",
        },
        enabled: {
          type: "Boolean",
        },
        allotPointsToAssignedUsers: {
          type: "Boolean",
        },
        applyOnlyOnce: {
          type: "Boolean",
        },
        forDocumentEvent: {
          type: "String",
        },
        userField: {
          type: "String",
        },
        multiplierField: {
          type: "String",
        },
        condition: {
          type: "String",
        },
        name: {
          type: "String",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "EnergyPointLog",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
    },
    {
      className: "LoanType",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        isTermLoan: {
          type: "Boolean",
        },
        disabled: {
          type: "Boolean",
        },
        loanName: {
          type: "String",
        },
        loanAmount: {
          type: "String",
        },
        rateOfInterest: {
          type: "String",
        },
        penaltyInterestRate: {
          type: "String",
        },
        gracePeriodinDays: {
          type: "String",
        },
        autoWriteOffAmount: {
          type: "String",
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
        },
        description: {
          type: "String",
        },
        modeOfPayment: {
          type: "String",
        },
        paymentAccount: {
          type: "Pointer",
          targetClass: "Account",
        },
        loanAccount: {
          type: "Pointer",
          targetClass: "Account",
        },
        interestIncomeAccount: {
          type: "Pointer",
          targetClass: "Account",
        },
        penaltyIncomeAccount: {
          type: "Pointer",
          targetClass: "Account",
        },
        series: {
          type: "String",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "HolidayList",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
          required: false,
        },
        fromDate: {
          type: "String",
          required: false,
        },
        toDate: {
          type: "String",
          required: false,
        },
        totalHolidays: {
          type: "Number",
          required: false,
        },
        holidays: {
          type: "Array",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "SupplierGroup",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        isGroup: {
          type: "Boolean",
        },
        name: {
          type: "String",
        },
        defaultPaymentTermsTemplate: {
          type: "String",
        },
        parentSupplierGroup: {
          type: "Pointer",
          targetClass: "SupplierGroup",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "TrainingResult",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        employees: {
          type: "Array",
        },
        status: {
          type: "String",
          required: false,
          defaultValue: "draft",
        },
        eventName: {
          type: "Pointer",
          targetClass: "TrainingEvent",
          required: false,
        },
        trainingEvent: {
          type: "Pointer",
          targetClass: "TrainingEvent",
        },
        name: {
          type: "String",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "Supplier",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        isFrozen: {
          type: "Boolean",
        },
        preventPOs: {
          type: "Boolean",
        },
        preventRFQs: {
          type: "Boolean",
        },
        warnPOs: {
          type: "Boolean",
        },
        warnRFQs: {
          type: "Boolean",
        },
        isTransporter: {
          type: "Boolean",
        },
        isInternalSupplier: {
          type: "Boolean",
        },
        disabled: {
          type: "Boolean",
        },
        blockSupplier: {
          type: "Boolean",
        },
        name: {
          type: "String",
        },
        country: {
          type: "String",
        },
        defaultCompanyBankAccount: {
          type: "String",
        },
        taxID: {
          type: "String",
        },
        taxCategory: {
          type: "String",
        },
        taxWithholdingCategory: {
          type: "String",
        },
        supplierGroup: {
          type: "Pointer",
          targetClass: "SupplierGroup",
        },
        supplierType: {
          type: "String",
        },
        pan: {
          type: "String",
        },
        billingCurrency: {
          type: "String",
        },
        priceList: {
          type: "String",
        },
        defaultPaymentTermsTemplate: {
          type: "String",
        },
        holdType: {
          type: "String",
        },
        releaseDate: {
          type: "String",
        },
        website: {
          type: "String",
        },
        supplierDetails: {
          type: "String",
        },
        printLanguage: {
          type: "String",
        },
        accounts: {
          type: "Array",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "PaymentTerm",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
          required: true,
          defaultValue: "NewTerm",
        },
        paymentMode: {
          type: "String",
          required: true,
        },
        discountType: {
          type: "String",
          required: false,
        },
        invoicePortion: {
          type: "Number",
          required: true,
        },
        discountNumber: {
          type: "Number",
          required: false,
        },
        series: {
          type: "String",
          required: true,
        },
        creditDay: {
          type: "String",
        },
        description: {
          type: "String",
        },
        dueDateType: {
          type: "String",
          required: true,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "GoldPrice",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        date: {
          type: "Date",
          required: false,
        },
        selling: {
          type: "Number",
          required: false,
        },
        buying: {
          type: "Number",
          required: false,
        },
        isActive: {
          type: "Boolean",
          required: false,
        },
        brand: {
          type: "Pointer",
          targetClass: "Brand",
          required: false,
        },
        sellingChange: {
          type: "Number",
          required: false,
        },
        buyingChange: {
          type: "Number",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "TrainingFeedback",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        feedback: {
          type: "String",
        },
        trainingEvent: {
          type: "Pointer",
          targetClass: "TrainingEvent",
          required: false,
        },
        employee: {
          type: "Pointer",
          targetClass: "Employee",
          required: false,
        },
        name: {
          type: "String",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "Driver",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        fullName: {
          type: "String",
        },
        status: {
          type: "String",
        },
        transporter: {
          type: "Pointer",
          targetClass: "Supplier",
        },
        employee: {
          type: "Pointer",
          targetClass: "Employee",
        },
        cellphoneNumber: {
          type: "String",
        },
        address: {
          type: "String",
        },
        licenseNumber: {
          type: "String",
        },
        issuingDate: {
          type: "String",
        },
        expiryDate: {
          type: "String",
        },
        series: {
          type: "String",
        },
        drivingLicense: {
          type: "Array",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "Vehicle",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        vehicleValue: {
          type: "Number",
        },
        odometerValue: {
          type: "Number",
        },
        employee: {
          type: "Pointer",
          targetClass: "Employee",
        },
        model: {
          type: "String",
        },
        make: {
          type: "String",
        },
        licensePlate: {
          type: "String",
        },
        acquisitionDate: {
          type: "String",
        },
        location: {
          type: "String",
        },
        chassisNo: {
          type: "String",
        },
        insuranceCompany: {
          type: "String",
        },
        policyNo: {
          type: "String",
        },
        startDate: {
          type: "String",
        },
        EndDate: {
          type: "String",
        },
        fuelType: {
          type: "String",
        },
        fuelUOM: {
          type: "String",
        },
        lastCarbonCheck: {
          type: "String",
        },
        color: {
          type: "String",
        },
        drivingLicense: {
          type: "Array",
        },
        doors: {
          type: "Number",
        },
        wheels: {
          type: "Number",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "VehicleLog",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        fuelPrice: {
          type: "Number",
        },
        fuelQty: {
          type: "Number",
        },
        currentOdometerValue: {
          type: "Number",
        },
        supplier: {
          type: "Pointer",
          targetClass: "Supplier",
        },
        employee: {
          type: "Pointer",
          targetClass: "Employee",
        },
        licensePlate: {
          type: "Pointer",
          targetClass: "Vehicle",
        },
        date: {
          type: "String",
        },
        invoiceRef: {
          type: "String",
        },
        series: {
          type: "String",
        },
        serviceDetails: {
          type: "Array",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "Category",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
          required: false,
          defaultValue: "gia dung",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "LoanApplication",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        isFrozen: {
          type: "Boolean",
        },
        preventPOs: {
          type: "Boolean",
        },
        preventRFQs: {
          type: "Boolean",
        },
        warnPOs: {
          type: "Boolean",
        },
        warnRFQs: {
          type: "Boolean",
        },
        isSecuredLoan: {
          type: "Boolean",
        },
        applicantType: {
          type: "String",
        },
        applicant: {
          type: "String",
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
        },
        postingDate: {
          type: "String",
        },
        status: {
          type: "String",
        },
        loanType: {
          type: "Pointer",
          targetClass: "LoanType",
        },
        loanAmount: {
          type: "String",
        },
        reason: {
          type: "String",
        },
        applicantForCustomer: {
          type: "Object",
        },
        applicantForEmployee: {
          type: "Pointer",
          targetClass: "Employee",
        },
        series: {
          type: "String",
        },
        loanSecurityDetails: {
          type: "Array",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "ItemG",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        username: {
          type: "String",
        },
        password: {
          type: "String",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "PromotionTest",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
          required: false,
        },
        series: {
          type: "String",
          required: false,
        },
        type: {
          type: "String",
          required: false,
        },
        description: {
          type: "String",
          required: false,
        },
        budget: {
          type: "Number",
          required: false,
        },
        percent: {
          type: "Number",
          required: false,
        },
        fixed: {
          type: "Number",
          required: false,
        },
        priceAbove: {
          type: "Number",
          required: false,
        },
        maxRedemption: {
          type: "Number",
          required: false,
        },
        maxRedemptionPerCustomer: {
          type: "Number",
          required: false,
        },
        isStackable: {
          type: "Boolean",
          required: false,
        },
        products: {
          type: "Array",
          required: false,
        },
        brands: {
          type: "Array",
          required: false,
        },
        categories: {
          type: "Array",
          required: false,
        },
        startDate: {
          type: "String",
          required: false,
        },
        endDate: {
          type: "String",
          required: false,
        },
        maxDiscount: {
          type: "Number",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "ShareHolder",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        title: {
          type: "String",
        },
        tag: {
          type: "String",
        },
        company: {
          type: "Pointer",
          targetClass: "Company",
          required: false,
        },
        name: {
          type: "String",
        },
        transferType: {
          type: "String",
        },
        date: {
          type: "String",
        },
        fromShareholder: {
          type: "String",
        },
        fromFolioNo: {
          type: "String",
        },
        toShareholder: {
          type: "String",
        },
        toFolioNo: {
          type: "String",
        },
        equityLiabilityAccount: {
          type: "String",
        },
        assetAccount: {
          type: "String",
        },
        shareType: {
          type: "String",
        },
        fromNo: {
          type: "String",
        },
        rate: {
          type: "String",
        },
        noOfShares: {
          type: "String",
        },
        toNo: {
          type: "String",
        },
        remarks: {
          type: "String",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "Menu",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        active: {
          type: "Boolean",
          required: false,
        },
        name: {
          type: "String",
          required: false,
        },
        icon: {
          type: "String",
          required: false,
        },
        path: {
          type: "String",
          required: false,
        },
        menu: {
          type: "Array",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "ShareTransfer",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
    },
    {
      className: "InterestRate",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
          required: false,
        },
        valueFrom: {
          type: "Number",
          required: false,
        },
        valueTo: {
          type: "String",
          required: false,
        },
        rate: {
          type: "Number",
          required: false,
        },
        noPeriods: {
          type: "Number",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "Question",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        id: {
          type: "String",
          required: false,
        },
        content: {
          type: "String",
          required: false,
        },
        A: {
          type: "String",
          required: false,
        },
        B: {
          type: "String",
          required: false,
        },
        C: {
          type: "String",
          required: false,
        },
        D: {
          type: "String",
          required: false,
        },
        correctAnswer: {
          type: "String",
          required: false,
        },
        category: {
          type: "Pointer",
          targetClass: "SysCfg",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "Exam",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        questions: {
          type: "Array",
          required: false,
        },
        isActive: {
          type: "Boolean",
          required: false,
        },
        name: {
          type: "String",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "_Installation",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        installationId: {
          type: "String",
        },
        deviceToken: {
          type: "String",
        },
        channels: {
          type: "Array",
        },
        deviceType: {
          type: "String",
        },
        pushType: {
          type: "String",
        },
        GCMSenderId: {
          type: "String",
        },
        timeZone: {
          type: "String",
        },
        localeIdentifier: {
          type: "String",
        },
        badge: {
          type: "Number",
        },
        appVersion: {
          type: "String",
        },
        appName: {
          type: "String",
        },
        appIdentifier: {
          type: "String",
        },
        parseVersion: {
          type: "String",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
    {
      className: "QualityInspection",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        series: {
          type: "String",
          required: false,
        },
        inspectionType: {
          type: "String",
          required: true,
        },
        referenceType: {
          type: "String",
          required: true,
        },
        referenceName: {
          type: "String",
          required: true,
        },
        reportDate: {
          type: "Date",
          required: true,
        },
        status: {
          type: "String",
          required: true,
        },
        itemCode: {
          type: "String",
          required: false,
        },
        itemSerialNo: {
          type: "String",
          required: false,
        },
        batchNo: {
          type: "String",
          required: false,
        },
        sampleSize: {
          type: "Number",
          required: true,
        },
        description: {
          type: "String",
          required: false,
        },
        qualityInspectionTemplate: {
          type: "String",
          required: false,
        },
        itemName: {
          type: "String",
          required: false,
        },
        inspectedBy: {
          type: "String",
          required: false,
        },
        verifiedBy: {
          type: "String",
          required: false,
        },
        remarks: {
          type: "String",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
    },
  ],
};
