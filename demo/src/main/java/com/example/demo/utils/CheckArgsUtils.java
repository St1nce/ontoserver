package com.example.demo.utils;

import com.example.demo.service.exception.*;

import java.util.Date;
import java.util.regex.Pattern;

public class CheckArgsUtils {
    private CheckArgsUtils() {
    }

    public static void requireNonNull(Object o, String message) {
        if (o == null || o == "") {
            throw new ServiceNullPointerException(message);
        }
    }

    public static void requireCyrillic(String str, String message) {
        if(str != null && str != "") {
            if (!Pattern.matches(".*\\p{InCyrillic}.*", str)) {
                throw new ServiceBadValueFormatException(message);
            }
        }
    }

    public static void requirePositiveNumber(Integer number, String message) {
        if (number < 0) {
            throw new ServiceBadValueFormatException(message);
        }
    }

    public static void requirePositiveNumberD(Double number, String message) {
        if (number < 0) {
            throw new ServiceBadValueFormatException(message);
        }
    }


    public static void requirePositiveNumberWithoutZero(Double number, String message) {
        if (number <= 0) {
            throw new ServiceBadValueFormatException(message);
        }
    }

    public static void requireNotFound(Object o, String message){
        if(o == null)
            throw new ServiceNotFoundException(message);
        else {
            if(o.getClass().equals(Boolean.class))
            {
                Boolean bool = (Boolean) o;
                if(!bool) throw new ServiceNotFoundException(message);
            }


        }
    }

    public static void requireRecordAlreadyExists(String message){
        throw new ServiceRecordAlreadyExistsException(message);
    }

    public static void requireNotEqual(Object o1, Object o2, String message){

        if(!o1.equals(o2))
            throw new ServiceNotEqual(message);
    }

    public static void requireNotHigh(Date less, Date high, String message){
        if(less.compareTo(high) > 0)
            throw new ServiceNotEqual(message);
    }

}
